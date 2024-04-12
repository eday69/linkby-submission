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
  { title: 'Timestamp', value: 'createdAt', sortable: false },
  { title: 'Name of Buyer', key: 'user.name', sortable: false },
  { title: 'Counter offer done by',
    key: 'counterOrigin',
    value: (item: any) => product.value?.userId == item.user.id ? 'Seller' : 'Buyer',
    sortable: false
  },
  { title: 'Price offered', key: 'offer', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];

const hasOffers = computed(() => offers.value && offers.value.length)
const isSeller = computed(() => product.value?.userId == authStore.userId);
const isOfferFromSeller = computed(() => product.value?.userId === (offers.value && offers.value.length && offers.value[0].user.id));
const showProdCounterButton = computed(() => !isSeller.value && (offers.value?.length === 0));
const showPurchaseButton = computed(() => (!isSeller.value
  && (offers.value?.length === 0 || product.value?.status === Status.Reserved))
  && product.value?.status != Status.Sold);
const showItemOfferButton = computed(() => !isOfferFromSeller.value
  || (!isSeller.value && isOfferFromSeller.value));
const showItemAcceptButton = computed(() => (isSeller.value && !isOfferFromSeller.value)
  || (!isSeller.value && isOfferFromSeller.value));
const isProductAvailable = computed(() => product.value?.status === Status.Available)

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
    await router.push({ name: 'landing' });
  }
}

async function updateProductStatus(status: Status) {
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

onMounted(async () => {
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
        v-if="showPurchaseButton"
      >
        Purchase
      </v-btn>
      <v-btn
        class='mx-5 login-btn'
        color='pink'
        @click="handleCounterOfferClick"
        v-if="showProdCounterButton">
        Counter Offer
      </v-btn>
    </div>
    <div class="pt-10" v-if="hasOffers">
      <div>Negotiation History</div>
      <v-data-table
        :headers="headers"
        :items="offers"
        item-key="name"
        items-per-page="0"
      >
        <template v-slot:[`item.actions`]="{ index }">
          <div class="actions" v-if="index === 0 && isProductAvailable">
            <v-btn
              color='pink'
              size="x-small"
              @click="handleCounterOfferClick"
              v-if="showItemOfferButton">
              Counter Offer
            </v-btn>
            <v-btn
              color='pink'
              size="x-small"
              @click="acceptCounterOffer"
              v-if="showItemAcceptButton">
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
