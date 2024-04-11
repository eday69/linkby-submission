<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type Product, type ProductOffer, useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'
import ImageDisplay from '@/components/ImageDisplay.vue'
import { useAuthStore } from '@/stores/auth'
import { Status } from '@/enums'
import CounterOfferDialog from '@/components/CounterOfferDialog.vue'

const productStore = useProductStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const product = ref<Product|undefined>(undefined);
const offers = ref<ProductOffer[]|undefined>(undefined);
const dialogOpen = ref(false);
const emit = defineEmits([
  'update:dialog',
  'new-offer'
]);

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const headers = [
  { title: 'Timestamp', value: 'createdAt' },
  { title: 'Name of Buyer', key: 'user.name' },
  { title: 'Counter offer done by',
    key: 'counterOrigin',
    value: (item: any) => product.value?.userId == item.user.id ? 'Seller' : 'Buyer'
  },
  { title: 'Price offered', key: 'offer' },
  { title: 'Actions', key: 'actions' },
];

const isPurchaseButtonVisible = computed(() => {
  return product.value?.userId != authStore.userId
    && product.value?.status != Status.Sold
});

const lastCounterOfferUserId = computed(() => offers.value && offers?.value[0].user.id);
const isSeller = computed(() => product.value?.userId == authStore.userId);
const isCounterBuyer = computed(() => product.value?.userId != lastCounterOfferUserId.value);
const isShowCounterOfferButtonVisible = computed(() => {
  return (!isSeller.value && offers.value?.length === 0)
    || isCounterBuyer.value;
});

async function loadOffers() {
  offers.value = await productStore.getProductOffers(route.params.id as string);
}

function handleCounterOfferClick() {
  dialogOpen.value = !dialogOpen.value;
}

async function handleCounterOfferValue(value: string) {
  if (authStore.userId) {
    await productStore.saveProductOffer({
      productId: Number(route.params.id),
      userId: authStore.userId,
      offer: Number(value)
    });
    await loadOffers();
  }
}

async function updateProductStatus(status: string) {
  if (product.value) {
    await productStore.updateProduct({
      id: product.value.id,
      status
    });
    await router.push({ name: 'landing' });
  }
}

function handlePurchaseClick() {
  updateProductStatus(Status.Sold)
}

function acceptCounterOffer() {
  updateProductStatus(Status.Reserved)
}

function newCounterOffer() {

}

onMounted(async () => {
  console.log(`loading product ${route.params.id} ...`);

  product.value = await productStore.getProduct(route.params.id as string);
  loadOffers()
})
</script>

<template>
  <div class="container">
    <counter-offer-dialog
      @new-offer="handleCounterOfferValue"
      @update:dialog="handleCounterOfferClick"
      v-if="dialogOpen"
    />
    <div class="status">
      <div>{{ product?.name }}</div>
      <v-chip variant="outlined" color="primary">
        {{ product?.status }}
      </v-chip>
    </div>
    <div>Initial price: {{ USDollar.format(product?.price || 0) }}</div>
    <div>Description: {{ product?.description }}</div>
    <div class="images">
      <ImageDisplay
        :image="image"
        width="200"
        height="200"
        v-for="(image, index) of product?.images"
        :key="index"/>
    </div>
    <div class="actions mt-10">
      <v-btn
        class='mx-5 login-btn'
        color='pink'
        @click="handlePurchaseClick"
        v-if="isPurchaseButtonVisible"
      >
        Purchase
      </v-btn>
      <v-btn
        class='mx-5 login-btn'
        color='pink'
        @click="handleCounterOfferClick"
        v-if="isShowCounterOfferButtonVisible">
        Counter Offer
      </v-btn>
    </div>
    <div class="pt-10">
      <div>Negotiation History</div>
      <v-data-table
        :headers="headers"
        :items="offers"
        item-key="name"
        items-per-page="0"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <v-btn
              color='pink'
              size="x-small"
              @click="newCounterOffer">
              Counter Offer
            </v-btn>
            <v-btn
              color='pink'
              size="x-small"
              @click="acceptCounterOffer"
              v-if="isSeller && isCounterBuyer"
            >
              Accept
            </v-btn>
          </div>
        </template>
        <template #bottom></template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  font-size: large;

  .status {
    display: flex;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .images {
    margin-top: 1rem;
    display: grid;
    gap: 1rem 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: auto;
  }
}
</style>
