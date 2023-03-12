import { IUsers } from "src/models/users"

export const useUsers = () => {

    const setUsersToLocalStorage = (data: IUsers[]) => {
        localStorage.setItem('users', JSON.stringify(data))
    }

    const getUserList = () => {
        return new Promise<IUsers[]>((resolve, reject) => {
            const localStorageUsers = localStorage.getItem('users');
            let listOfUsers: IUsers[] = [];

            if(localStorageUsers) {
                listOfUsers = JSON.parse(localStorageUsers) as IUsers[];
            } else {
                setUsersToLocalStorage(listOfUsers);
            }

            resolve(listOfUsers)
        })
    }

    const addNewUsers = async (data: Required<IUsers>) => {
        const users = [...(await getUserList())];
        const isExisted = users.find((user) => user.email === data.email)
        if (!isExisted) {
          users.unshift(data)
          setUsersToLocalStorage(users)
        } else {
          return 'This account has already been added'
        }
        return users    
    }

    return { setUsersToLocalStorage, addNewUsers, getUserList }
}