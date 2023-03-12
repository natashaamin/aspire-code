import { defineStore } from "pinia";
import { IUsers } from "src/models/users";
import { ref } from "vue";

export const useUserStore = defineStore('user-store', () => {
    const users = ref<IUsers[]>([])

    const setUser = (data: IUsers[]) => {
        users.value = [...data]
      }

      return {
        setUser
      }
})