<template>

  <div class="drug-all">
    <div class="top-head">
      <label class="head-font">Drugs</label>
    </div>
    <v-card class="style-card mb-5">
      <v-container>
        <v-row>
          <v-col >
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
          <v-col  md="2" class="text-right">
            <v-btn color="#f4742b" small class="btn-head" @click="dialogDrugs = true">สร้างรายการ</v-btn>
          </v-col>
          <v-col  md="2" class="text-right">
            <v-btn small color="#4caf50" class="btn-export" @click="exportToExcel">Export Excel</v-btn>
          </v-col>
          
        </v-row>   
        <DatePicker  @change_date="changeStartDate" @change_end_date="changeEndDate"/>
      </v-container>
    </v-card>

      <!-- Table -->
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
            <v-btn color="#f4742b" small class="btn-action"><i class="fas fa-search"></i></v-btn>
            
          
          </router-link>

          <v-btn color="#f4742b" small class="btn-action" @click="dialogUpadateDrugs(item)"><i class="fas fa-edit"></i></v-btn>

          </v-col>
        
        </template>

      </v-data-table>

    </v-card>

     <!-- Form-->
     <v-dialog v-model="dialogDrugs" persistent max-width="700px">
        <v-form ref="formDrugs" validate-on="submit lazy" @submit.prevent="saveDrugs">
            <v-card>
                <v-card-title class="dialog-title mb-3">
                    <span class="text-h5">{{ TitleDrugs }}</span>
                </v-card-title>
                <v-card-text class="pa-0">
                    <v-container>
                        <v-row>
                          
                          <!-- input Drug_Code -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Drug_Code</p>
                              <v-text-field
                                  v-model="dataFrom.Drug_Code"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Drug_Code"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                          <!-- input Drug_EnglishName -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Drug_EnglishName</p>
                              <v-text-field
                                  v-model="dataFrom.Drug_EnglishName"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Drug_EnglishName"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>
                          
                          <!-- input Drug_ThaiName -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Drug_ThaiName</p>
                              <v-text-field
                                  v-model="dataFrom.Drug_ThaiName"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Drug_ThaiName"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                          <!-- input Drug_GenericName -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Drug_GenericName</p>
                              <v-text-field
                                  v-model="dataFrom.Drug_GenericName"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Drug_GenericName"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                          <!-- input Drug_TradeName -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Drug_TradeName</p>
                              <v-text-field
                                  v-model="dataFrom.Drug_TradeName"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Drug_TradeName"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input Drug_Catagory -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Drug_Catagory</p>
                              <v-text-field
                                  v-model="dataFrom.Drug_Catagory"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Drug_Catagory"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input TPU_Code -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>TPU_Code</p>
                              <v-text-field
                                  v-model="dataFrom.TPU_Code"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="TPU_Code"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input GPU_Code -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>GPU_Code</p>
                              <v-text-field
                                  v-model="dataFrom.GPU_Code"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="GPU_Code"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input Claim_Desc -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Claim_Desc</p>
                              <v-text-field
                                  v-model="dataFrom.Claim_Desc"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Claim_Desc"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input Group_Bill -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>Group_Bill</p>
                              <v-text-field
                                  v-model="dataFrom.Group_Bill"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="Group_Bill"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input SIMB -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>SIMB</p>
                              <v-text-field
                                  v-model="dataFrom.SIMB"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="SIMB"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>

                            <!-- input ClaimCat -->
                          <v-col cols="12" md="6" class="py-0">
                              <p class="style-label"><span>*</span>ClaimCat</p>
                              <v-text-field
                                  v-model="dataFrom.ClaimCat"
                                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                  label="ClaimCat"
                                  dense
                                  outlined
                                  single-line
                                  clearable 
                              ></v-text-field>
                          </v-col>
                      
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="dialog-action">
                <v-spacer></v-spacer>
                <v-btn variant="text" class="btn-save" type="submit">บันทึก</v-btn>
                <v-btn variant="text" class="btn-cancel" @click="clear">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>

        </v-form>
      </v-dialog>
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
      dialogDrugs :false,
      dataFrom: {},
      catDrugs: -1,
 
    }), 
    mounted(){
        this.getListDrugAll()

    },
    computed: {
      filteredItems() {
        return this.dataDurgList.filter(item => {
          const itemDate = item.create_Date;
          const startDate = this.getStartDate;
          const endDate = this.getEndDate;
          return (
            (startDate === null || itemDate >= startDate) &&
            (endDate === null || itemDate <= endDate)
          );
        });
      },
      TitleDrugs () {
          return this.catDrugs === -1 ? 'สร้าง' : 'แก้ไข'
      },
   
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

      clear(){
        this.dialogDrugs            = false
        this.catDrugs               = -1
        this.dataFrom = {}
        this.$refs.formDrugs.resetValidation()
      },

      dialogUpadateDrugs(value){
          console.log(value);
          this.dataFrom           = value
          this.dialogDrugs        = true
          this.catDrugs           = 0
      },

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

      async saveDrugs(){
        '=================='
      }


    }
  }
</script>

<style scoped>

  .btn-export{
    padding: 1.25rem!important;
    color: white;
  }


  ::v-deep thead.v-data-table-header {
    background: #223E7E!important;
  }
  ::v-deep thead.v-data-table-header span{
    color: white;
  }

  ::v-deep thead.v-data-table-header i.mdi-arrow-up::before {
    color: white;
  }

  .dialog-title{
    background-color: #f4742b;
  }

  .dialog-title span{
    color: white
  }




</style>