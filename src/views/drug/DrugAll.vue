<template>

  <div class="drug-all">
    <div class="top-head">
      <label class="head-font">เเสดงรายการยา</label>
    </div>
    <v-card class="style-card mb-5">
  
    
      <v-container>
        <v-row>
          <v-col cols>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="ค้นหา (รหัสยา, ประเภทยา)"
              dense
              outlined
              single-line
              hide-details="auto"
              clearable 
            ></v-text-field>
          </v-col>
          <v-col  md="3">
            <v-btn color="#f4742b" small class="btn-export" @click="exportToExcel">Export Excel</v-btn>
          </v-col>
        </v-row>   
        <DatePicker  @change_date="changeStartDate" @change_end_date="changeEndDate"/>
      </v-container>
    </v-card>

    <v-card class="style-card">

      <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"

      >
        <template v-slot:[`item.create_Date`]="{ item }">{{ getThaiDate(item.Create_Date )}}</template>
        <template v-slot:[`item.action`]="{ item }">
          <v-col cols="auto">
            <router-link
              :to="{ name: 'drug-detail', params: { id: item.Drug_Code } }"
              class="btn btn-warning removeUnderline"
            >
            <v-btn color="#f4742b" small class="mt-2">ดู</v-btn>
          
          </router-link>

          </v-col>
        
        </template>

      </v-data-table>

      <!-- <v-pagination
      v-model="currentPage"
        :length="totalPages"
        :total-visible="7"
        @input="updatePage"
      ></v-pagination> -->


    </v-card>
  </div>

</template>


<script>

  import axios from "axios";
  import * as XLSX from 'xlsx';
  import DatePicker from '@/components/DatePicker.vue';
  export default {
    components: {DatePicker},
    data : () => ({
      search: '',
      loading: true,
      headers: [
        {
          text: 'รหัสยา',
          align: 'left',
          value: 'Drug_Code',
        },
        {
          text: 'ชื่อยา (ภาษาไทย)',
          align: 'start',
          sortable: false,
          value: 'Drug_ThaiName',
        },
        {
          text: 'ชื่อยา (ภาษาอังกฤษ)',
          align: 'start',
          sortable: false,
          value: 'Drug_EnglishName',
        },
        {
          text: 'ประเภทยา',
          align: 'start',
          sortable: false,
          value: 'Drug_Catagory',
        },
        { text: 'วันที่สร้าง', value: 'create_Date' },
        {
          text: 'Action',
          align: 'center',
          value: 'action',
        },
      ],
      dataDurgList: [],
      getStartDate: null,
      getEndDate: null,
      checkPage : true,
 
    }), 
    mounted(){
        this.getListDrugAll()

    },
    computed: {
      filteredItems() {
        return this.dataDurgList.filter(item => {
          // console.log(item);
          // const status_call = this.getstatus(item.status_call)
          const itemDate = item.create_Date;
          const startDate = this.getStartDate;
          const endDate = this.getEndDate;
          // item["dataStatus"] = status_call;
          // item["dataAdminName"] = `${item.adminName + ' ' + item.adminLastname}`;
          // item["dataDate"] = `${this.getThaiDate(item.start_date) +' ถึง ' + this.getThaiDate(item.end_date) }`;
          // item["dataCreateDate"] = `${ this.getThaiDate(item.create_date) }`;
          return (
            (startDate === null || itemDate >= startDate) &&
            (endDate === null || itemDate <= endDate)
          );
        });
      },
      // totalPages() {
      //   return Math.ceil(this.filteredItems.length / this.itemsPerPage);
      // },
      // pagedItems() {
      //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      //   const endIndex = startIndex + this.itemsPerPage;
      //   return this.filteredItems.slice(startIndex, endIndex);
      // }

   
    },
    methods: {
      getThaiDate(item){
      if (item){
        var d = new Date(item);
        return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
      }else{
        return "";
      }            
    },
      // drugDetailById(id){
      //   console.log(id);
      // },
      async getListDrugAll(){
        try {
            // let drugAllPath = '/api/Drug_Master'
            let drugAllPath = '/api/InterfaceBrowser/GetDrugs'
            let response = await axios.get(drugAllPath);
            this.dataDurgList = await response.data;
            this.loading = await false
        } catch (error) {
            this.loading = await false

            console.error('Error fetching data:', error);
        }
      },

      exportToExcel() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(this.filteredItems);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, 'report-drug.xlsx');
      },

      changeStartDate(date){
        this.getStartDate = date
      },
      changeEndDate(date){
        this.getEndDate = date
      },
      // updatePage(page) {
      //   this.currentPage = page;
      // },
      //   updateSearch() {
      //   // Update the search results when the search query changes
      //   this.currentPage = 1; // Reset to the first page when the search changes
      // }
    }
  }
</script>

<style scoped>
  .btn-export{
    padding: 1.25rem!important;

  }
  ::v-deep thead.v-data-table-header {
    background: #2e3192!important;
  }
  ::v-deep thead.v-data-table-header span{
    color: white;
  }

  ::v-deep thead.v-data-table-header i.mdi-arrow-up::before {
    color: white;
  }

</style>