<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group horizontal label="Filter">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        </b-col>
        <b-col>
          <b-form-group horizontal label="Per page">
            <b-form-select :options="pageOptions" v-model="perPage" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-pagination class="pagination" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
        </b-col>
      </b-row>

      <b-table show-empty
               :items="items"
               :fields="fields"
               :current-page="currentPage"
               :per-page="perPage"
               :filter="filter"
               @filtered="onFiltered"
      >
        <template slot="actions" slot-scope="row">
          <b-button @click.stop="changeRole(row.item)">
            Change role
          </b-button>
          <b-button @click.stop="changeEnable(row.item)">
            {{ row.item.disabled ? 'Enable' : 'Disable'}}
          </b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>
<script>
const someItems = [
        {
          id: 1,
          name: 'Tomas Tomaitis',
          email: 'gmail@gmail.com',
          role: 'User',
          disabled: true
        },
        {
          id: 2,
          name: 'Jonas Jonaitis',
          email: 'hotmail@hotmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 3,
          name: 'Greta Gretukas',
          email: 'aaaa@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 4,
          name: 'Mantas Mantukas',
          email: 'bbbb@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 5,
          name: 'Marius Mariukas',
          email: 'cccc@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 6,
          name: 'Dovile Doviliukas',
          email: 'ddeee@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 7,
          name: 'Saulius Sauliukas',
          email: 'gggg@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 8,
          name: 'Darth Vader',
          email: 'yyyy@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 9,
          name: 'Dwight Schrute',
          email: 'wqqqq@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 10,
          name: 'Bim Bom',
          email: 'zzz@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 11,
          name: 'Pew pow',
          email: 'eeee@gmail.com',
          role: 'User',
          disabled: false
        },
        {
          id: 12,
          name: 'Lala Lolo',
          email: 'uuuuu@gmail.com',
          role: 'User',
          disabled: false
        }
      ]
export default{
  data () {
    return {
      pageOptions: [ 5, 10, 15 ],
      perPage: 5,
      fields: [
        { key: 'name', label: 'Full name', sortable: true, 'class': 'text-center' },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role' },
        { key: 'disabled', label: 'Disabled' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      filter: null,
      items: someItems,
      totalRows: someItems.length
    }
  },
  methods: {
    changeRole (user) {
      switch (user.role) {
        case 'User':
          user.role = 'Admin'
          break
        case 'Admin':
          user.role = 'User'
          break
      }
    },
    changeEnable (user) {
      user.disabled = !user.disabled
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
<style>
  .pagination{
    float: right;
  }
</style>
