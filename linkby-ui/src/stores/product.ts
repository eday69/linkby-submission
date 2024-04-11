import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Status as StatusType } from '@/enums'

interface ProductUser {
  id: number
  name: string
}

export interface ProductOffer {
  user: ProductUser
  offer: number
  createdAt: Date
}

export interface IOffer {
  productId: number
  userId: number
  offer: number
}

export interface ProductStatus {
  id: number
  status: StatusType
}

export interface IImage {
  id: number
  productId: number
  imageType: string
  imageName: string
  imageData: string
}

export interface NewProduct {
  userId: number
  name: string
  price: number
  description: string
  images: IImage[]
}

export interface Product extends NewProduct, ProductStatus {
  createdAt: Date
  updatedAt: Date
  user: ProductUser
}

export const useProductStore = defineStore('product', () => {
  const productList: Ref<Product[]> = ref([])
  const loading = ref(false)

  async function getProducts() {
    loading.value = true
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const { products } = await response.json();
        productList.value = products;
        loading.value = false
      } else {
        loading.value = false
        console.error("Error:", response.status);
      }

    } catch (error) {
      loading.value = false
      console.error("Error:", error);
    }
  }

  async function saveProduct(payload: FormData) {
    try {
      const response = await fetch('http://localhost:3000/product', {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getProduct(id: string): Promise<Product|undefined> {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error:", response.status);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateProduct(payload: ProductStatus) {
    try {
      const response = await fetch(`http://localhost:3000/product/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      if (!response.ok) {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getProductOffers(id: string): Promise<ProductOffer[]|undefined> {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}/offers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error:", response.status);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function saveProductOffer(payload: IOffer) {
    try {
      const response = await fetch(`http://localhost:3000/product/${payload.productId}/offer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      if (!response.ok) {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return {
    productList,
    getProducts,
    saveProduct,
    getProduct,
    updateProduct,
    getProductOffers,
    saveProductOffer
  }
})
