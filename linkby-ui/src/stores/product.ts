import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Status as StatusType } from '@/enums'

interface ProductUser {
  id: number
  name: string
}

interface Offer {
  userId: number
  offer: number
  createdAt: Date
}
export interface ProductStatus {
  id: number
  status: StatusType
}

export interface NewProduct {
  userId: number
  name: string
  price: number
  description: string
  images: File[]
}

export interface Product extends NewProduct, ProductStatus {
  createdAt: Date
  updatedAt: Date
  user: ProductUser
  offers: Offer[]
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

  async function saveProduct(payload: NewProduct) {
    try {
      console.log('NewProduct', payload);
      const response = await fetch('http://localhost:3000/product', {
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
      console.log('NewProduct', payload);
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

  return { productList, getProducts, saveProduct, getProduct, updateProduct }
})
