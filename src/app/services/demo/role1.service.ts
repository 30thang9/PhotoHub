import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { environment } from 'src/app/environments/environment';
import { Role } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class Role1Service {

  getRoles(): Promise<Role[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'roles/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const roles = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const roleData = data[key];
            const role: Role = {
              id: roleData.id,
              name: roleData.name || '',
            };

            roles.push(role);
          }
        }

        resolve(roles); // Trả về danh sách người dùng khi hoàn thành
      });
    });
  }

  async getRoleById(id: number): Promise<Role | null> {
    try {
      const roleInfos = await this.getRoles();
      const roleInfo = roleInfos.find((role) => role.id === id);
      return roleInfo || null;
    } catch (error) {
      console.error('Error fetching role by ID:', error);
      return null;
    }
  }

  async getRoleByName(rolename: string): Promise<Role | null> {
    try {
      const roleInfos = await this.getRoles();
      const roleInfo = roleInfos.find((role) => role.name === rolename);
      return roleInfo || null;
    } catch (error) {
      console.error('Error fetching role by rolename', error);
      return null;
    }
  }


  async createRole(roleData: Role): Promise<Role | null> {
    try {
      const isUnique = await this.isNameUnique(roleData.name);

      if (!isUnique) {
        console.log('The role name is not unique');
        return null;
      }

      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newroleId = await this.generateNewId();
      const newroleRef = ref(db, 'roles/' + newroleId);

      const newrole = {
        id: newroleId,
        name: roleData.name,
      };

      await set(newroleRef, newrole);
      return newrole;
    } catch (error) {
      console.error('Error creating role:', error);
      return null;
    }
  }

  async updateRole(updatedrole: Role): Promise<Role | null> {
    try {
      const roleInfos = await this.getRoleById(updatedrole.id);

      if (roleInfos === null) {
        console.error('role information not found for ID:', updatedrole.id);
        return null;
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);

      const up = {
        id: updatedrole.id,
        name: updatedrole.name,
      };

      // Update the role info in Firebase
      const roleInfoRef = ref(db, `roles/${updatedrole.id}`);
      await set(roleInfoRef, up);
      return updatedrole;
    } catch (error) {
      console.error('Error updating role:', error);
      return null;
    }
  }

  async generateNewId(): Promise<number> {
    const roles = await this.getRoles();
    const maxId = roles.length === 0 ? 0 : Math.max(...roles.map((role) => role.id));
    return maxId + 1;
  }

  async isNameUnique(rolename: string): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const rolesRef = ref(db, 'roles');

    const snapshot = await get(rolesRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].rolename === rolename) {
            // The rolename is not unique
            return false;
          }
        }
      }
    }
    return true;
  }

}
