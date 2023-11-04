import { Injectable, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class User1Service {

  // constructor(private db: Database) { }

  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'users/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const users = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const userData = data[key];
            const user: User = {
              id: userData.id,
              username: userData.username || '',
              password: userData.password || '',
              full_name: userData.full_name || '',
              email: userData.email || '',
              phone_number: userData.phone_number || '',
              address: userData.address || '',
              avatar: userData.avatar || '',
              role_id: userData.role_id || 0,
              exp: userData.exp || 0
            };

            users.push(user);
          }
        }

        resolve(users); // Trả về danh sách người dùng khi hoàn thành
      });
    });
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const userInfos = await this.getUsers();
      const userInfo = userInfos.find((user) => user.id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const userInfos = await this.getUsers();
      const userInfo = userInfos.find((user) => user.username === username);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by username', error);
      return null;
    }
  }


  async createUser(userData: User): Promise<User | null> {
    try {
      const isUnique = await this.isUsernameUnique(userData.username);

      if (!isUnique) {
        console.log('The username is not unique');
        return null;
      }

      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newUserId = await this.generateNewId();
      const newUserRef = ref(db, 'users/' + newUserId);

      const newUser: User = {
        id: newUserId,
        username: userData.username,
        password: userData.password,
        full_name: userData.full_name,
        email: userData.email,
        phone_number: userData.phone_number,
        address: userData.address,
        exp: userData.exp,
        avatar: userData.avatar,
        role_id: userData.role_id,
      };

      await set(newUserRef, newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateUser(updatedUser: User): Promise<User | null> {
    try {
      const userInfos = await this.getUserById(updatedUser.id);

      if (userInfos === null) {
        console.error('User information not found for ID:', updatedUser.id);
        return null;
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);

      const up: User = {
        id: updatedUser.id,
        username: updatedUser.username,
        password: updatedUser.password,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
        role_id: updatedUser.role_id,
        exp: updatedUser.exp
      };

      // Update the user info in Firebase
      const userInfoRef = ref(db, `users/${updatedUser.id}`);
      await set(userInfoRef, up);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async generateNewId(): Promise<number> {
    const users = await this.getUsers();
    const maxId = users.length === 0 ? 0 : Math.max(...users.map((user) => user.id));
    return maxId + 1;
  }

  async isUsernameUnique(username: string): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const usersRef = ref(db, 'users');

    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].username === username) {
            // The username is not unique
            return false;
          }
        }
      }
    }
    return true;
  }

}
