<template>
  <div class="drug-all">
    <div class="top-head">
      <label class="head-font">Drugs</label>
    </div>
    <v-card class="style-card mb-5">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
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
          <v-col cols="6" md="2" class="text-right">
            <v-btn color="#f4742b" small class="btn-head w-100 disabled"  @click="dialogForm = true">สร้างรายการ</v-btn>
          </v-col>
          <v-col cols="6" md="2" class="text-right">
            <v-btn small color="#4caf50" class="btn-export w-100" @click="exportToExcel">Export Excel</v-btn>
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
          :footer-props="{ 'items-per-page-options': [10, 20, 30, 100] }"
          class="style-table"

      >
        <template v-slot:[`item.Create_Date`]="{ item }">{{ formatDate(item.Create_Date )}}</template>
        <template v-slot:[`item.action`]="{ item }">
          <v-col cols="auto">
          <v-btn color="#f4742b" small class="btn-action mr-1" @click="dialogUpadateDrugs(item)"><i class="fas fa-edit f-16"></i></v-btn>
          <v-btn color="#223E7E" small class="btn-check" @click="dialogDrugsPrice(item.Drug_Code)"><i class="fas fa-money-check-alt color-white f-16"></i></v-btn>
          </v-col>
        
        </template>

      </v-data-table>

    </v-card>

     <!-- Form Create, Update -->
     <v-dialog v-model="dialogForm" persistent max-width="700px">
      <LoaderData v-if="loaderEdit && catTitle == 0"/>
        <v-form v-else ref="form" validate-on="submit lazy" @submit.prevent="saveDrugs">
            <v-card>
              <v-toolbar class="head-toolbar">
                <v-toolbar-title class="color-white">{{ dialogTitle }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="clear">
                    <i class="far fa-window-close toolbar-icon"></i>
                  </v-btn>
              </v-toolbar>
              <v-container>
                  <v-row class="pt-2">
                    
                    <!-- input Drug_Code -->
                    <v-col cols="12" md="6" class="py-0">
                        <p class="style-label"><span>*</span>Drug_Code</p>
                        <v-text-field
                            v-model="dataForm.Drug_Code"
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
                            v-model="dataForm.Drug_EnglishName"
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
                            v-model="dataForm.Drug_ThaiName"
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
                        <p class="style-label">Drug_GenericName</p>
                        <v-text-field
                            v-model="dataForm.Drug_GenericName"
                            label="Drug_GenericName"
                            dense
                            outlined
                            single-line
                            clearable 
                        ></v-text-field>
                    </v-col>

                    <!-- input Drug_TradeName -->
                    <v-col cols="12" md="6" class="py-0">
                        <p class="style-label">Drug_TradeName</p>
                        <v-text-field
                            v-model="dataForm.Drug_TradeName"
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
                            v-model="dataForm.Drug_Catagory"
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
                            v-model="dataForm.TPU_Code"
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
                        <p class="style-label">GPU_Code</p>
                        <v-text-field
                            v-model="dataForm.GPU_Code"
                            label="GPU_Code"
                            dense
                            outlined
                            single-line
                            clearable 
                        ></v-text-field>
                    </v-col>

                      <!-- input Claim_Desc -->
                    <v-col cols="12" md="6" class="py-0">
                        <p class="style-label">Claim_Desc</p>
                        <v-text-field
                            v-model="dataForm.Claim_Desc"
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
                            v-model="dataForm.Group_Bill"
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
                        <p class="style-label">SIMB</p>
                        <v-text-field
                            v-model="dataForm.SIMB"
                            label="SIMB"
                            dense
                            outlined
                            single-line
                            clearable 
                        ></v-text-field>
                    </v-col>

                      <!-- input ClaimCat -->
                    <v-col cols="12" md="6" class="py-0">
                        <p class="style-label">ClaimCat</p>
                        <v-text-field
                            v-model="dataForm.ClaimCat"
                            label="ClaimCat"
                            dense
                            outlined
                            single-line
                            clearable 
                        ></v-text-field>
                    </v-col>
                
                  </v-row>
                  <v-card-actions class="dialog-action px-0 py-0">
                    <v-spacer></v-spacer>
                      <!-- ปุ่ม สร้างและแก้ไข-->
                      <!-- <v-btn variant="text" class="btn-save" type="submit">บันทึก</v-btn> -->
                      <!-- <v-btn variant="text" class="btn-cancel" @click="clear">ยกเลิก</v-btn> -->
                    </v-card-actions>
              </v-container>

                
            </v-card>

        </v-form>
      </v-dialog>

      <!-- Form DrugsPrice -->
      <v-dialog v-model="showDrugsPrice" persistent max-width="700px">
        <LoaderData  v-if="loaderCheckPrice"/>
          
            <v-card v-else>
              <v-toolbar class="head-toolbar">
                  <v-toolbar-title class="color-white">รายละเอียดราคา</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="clearDrugsPrice">
                    <i class="far fa-window-close toolbar-icon"></i>
                  </v-btn>
              </v-toolbar>
          
              <v-card-text class="pa-0">
                  <v-container>
                    <v-data-table
                        :headers="headersDrugPrice"
                        :items="datasDrugPrice"
                        :search="search"
                        :loading="loading"
                        loading-text="Loading... Please wait"
                        :footer-props="{ 'items-per-page-options': [10, 20, 30, 100] }"
                        class="style-table"
                      >
                      <template v-slot:[`item.Create_Date`]="{ item }">{{ formatDate(item.Create_Date )}}</template>
                    </v-data-table>
                  </v-container>
              </v-card-text>

            </v-card>

      
      </v-dialog>
  </div>

</template>


<script>
  import DatePicker from '@/components/DatePicker.vue';
  import LoaderData from '@/components/LoaderData.vue';
  import * as XLSX from 'xlsx';
  import moment from 'moment';
  import 'moment/locale/th';
  export default {
    components: {DatePicker, LoaderData},
    data : () => ({
      search: '',
      loading: true,
      dataDurgList: [],
      getStartDate: null,
      getEndDate: null,
      checkPage : true,
      showDrugsPrice: false,
      Drug_Code: {},
      datasDrugPrice: [],
      headers: [
        {text: 'Code', align: 'left', value: 'Drug_Code'},
        {text: 'Drug ThaiName', align: 'start', value: 'Drug_ThaiName'},
        {text: 'Drug EnglishName', align: 'start', value: 'Drug_EnglishName'},
        {text: 'Drug Catagory', align: 'start', value: 'Drug_Catagory'},
        {text: 'Create Date', value: 'Create_Date' },
        {text: 'Action', align: 'center', value: 'action'},
      ],
      headersDrugPrice: [
        {text: 'Running No', align: 'left', value: 'Running_No'},
        {text: 'Drug Code', align: 'start', sortable: false, value: 'Drug_Code'},
        {text: 'Price Type', align: 'start', sortable: false, value: 'Price_Type'},
        {text: 'Unit Code1', align: 'start', sortable: false, value: 'UnitCode1'},
        {text: 'Unit Price1', align: 'start', sortable: false, value: 'UnitPrice1'},
        {text: 'Unit Code2', align: 'start', sortable: false, value: 'UnitCode2'},
        {text: 'Unit Price2', align: 'start', sortable: false, value: 'UnitPrice2'},
        {text: 'Unit Code3', align: 'start', sortable: false, value: 'UnitCode3'},
        {text: 'Unit Price3', align: 'start', sortable: false, value: 'UnitPrice3'},
        {text: 'Create Date', align: 'start', sortable: false, value: 'Create_Date'},
        {text: 'InActive', align: 'start', sortable: false, value: 'InActive'},
      ],
      loaderCheckPrice  : true,
 
    }), 
    mounted(){
      this.getListDrugAll()
    },

    computed: {
      filteredItems() {
        const searchQuery = this.search.toLowerCase();
        return this.dataDurgList.filter(item => {
          const itemDate = item.Create_Date;
          const startDate = this.getStartDate;
          const endDate = this.getEndDate;
          const searchMatch = (
          item.Drug_Code.toLowerCase().includes(searchQuery) || // Example for Drug_Code
          item.Drug_Catagory.toLowerCase().includes(searchQuery) // Example for another field
        );
          return (
            searchMatch &&
            (startDate === null || itemDate >= startDate) &&
            (endDate === null || itemDate <= endDate)
          );
        });
      },

      dialogTitle () {
            // return this.catTitle === -1 ? 'สร้าง' : 'แก้ไข'
            return this.catTitle === -1 ? 'สร้าง' : 'รายละเอียดยา'
        },

    },

    methods: {

      changeStartDate(date){
        this.getStartDate = date
      },

      changeEndDate(date){
        this.getEndDate = date
      },

      clearDrugsPrice(){
        this.loaderCheckPrice   = true
        this.showDrugsPrice     = false
      },

      exportToExcel() {
          const fileName = 'Drug.xlsx'
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(this.filteredItems);
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          /* generate XLSX file and send to client */
          XLSX.writeFile(wb, fileName);
      },

      async dialogUpadateDrugs(value){
        this.catTitle           = await 0
        this.dialogForm        = await true
        setTimeout(() => {
          this.loaderEdit       = false;
          this.dataForm         = JSON.parse(JSON.stringify(value));
        }, 500);
      },

      async dialogDrugsPrice(Drug_Code){
        this.showDrugsPrice             = await true
        try {
          let drugsPriceAllPath         = `/api/InterfaceBrowser/GetDrugsPrice?Drug_Code=${Drug_Code}`
          let response                  = await this.$axios.get(drugsPriceAllPath);
          setTimeout(() => {
            this.loaderCheckPrice       = false;
            const data                  = response.data;
            this.datasDrugPrice         = data;
          }, 500);
        } catch (error) {
          this.loaderCheckPrice         = false;
          console.log('drugsPriceAllPath', error);
        }

      },

      async getListDrugAll(){
        try {
            let drugAllPath     = `/api/InterfaceBrowser/GetDrugs`
            let response        = await this.$axios.get(`${drugAllPath}`);
            this.dataDurgList   = await response.data;
            this.loading        = await false
        } catch (error) {
            this.loading        = await false
            console.error('Error fetching data:', error);
        }
      },

      async saveDrugs(){
        try {
          if(this.$refs.form.validate()){
            let fd = null
            let drugPath = null
            if(this.catTitle === -1){
              // create
              fd = {
                "drug_Code"           : this.dataForm.Drug_Code,
                "drug_EnglishName"    : this.dataForm.Drug_EnglishName,
                "drug_ThaiName"       : this.dataForm.Drug_ThaiName,
                "drug_GenericName"    : this.dataForm.Drug_GenericName,
                "drug_TradeName"      : this.dataForm.Drug_TradeName,
                "drug_Catagory"       : this.dataForm.Drug_Catagory,
                "tpU_Code"            : this.dataForm.TPU_Code,
                "gpU_Code"            : this.dataForm.GPU_Code,
                "claim_Desc"          : this.dataForm.Claim_Desc,
                "group_Bill"          : this.dataForm.Group_Bill,
                "simb"                : this.dataForm.SIMB,
                "claimCat"            : this.dataForm.ClaimCat,
                "create_Date"         : moment().format('YYYY-MM-DD HH:mm:ss'),
                "create_By"           : this.dataForm.create_By,
                "cxl_Date"            : moment().format('YYYY-MM-DD HH:mm:ss'),
                "cxl_By"              : this.dataForm.cxl_By,
                "update_Date"         : moment().format('YYYY-MM-DD HH:mm:ss'),
                "update_By"           : this.dataForm.update_By,
                "stockInactiveCode"   : this.dataForm.stockInactiveCode,
              }
              drugPath = await `/api/InterfaceBrowser/CreateDrugMaster`
            }else{

              this.alertEdit()
              this.clear()
              // fd = {
              //   "drug_Code"           : this.dataForm.Drug_Code,
              //   "drug_EnglishName"    : this.dataForm.Drug_EnglishName,
              //   "drug_ThaiName"       : this.dataForm.Drug_ThaiName,
              //   "drug_GenericName"    : this.dataForm.Drug_GenericName,
              //   "drug_TradeName"      : this.dataForm.Drug_TradeName,
              //   "drug_Catagory"       : this.dataForm.Drug_Catagory,
              //   "tpU_Code"            : this.dataForm.TPU_Code,
              //   "gpU_Code"            : this.dataForm.GPU_Code,
              //   "claim_Desc"          : this.dataForm.Claim_Desc,
              //   "group_Bill"          : this.dataForm.Group_Bill,
              //   "simb"                : this.dataForm.SIMB,
              //   "claimCat"            : this.dataForm.ClaimCat,
              //   "cxl_Date"            : moment().format('YYYY-MM-DD HH:mm:ss'),
              //   "cxl_By"              : this.dataForm.cxl_By,
              //   "update_Date"         : moment().format('YYYY-MM-DD HH:mm:ss'),
              //   "update_By"           : this.dataForm.update_By,
              //   "stockInactiveCode"   : this.dataForm.stockInactiveCode,
              // }
            }

            await this.$axios.post(`${drugPath}`, fd)

          }
        } catch (error) {
          console.log('saveDrugs',error);
        }
      
      },

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
  .f-16{
    font-size: 16px;
  }
  .w-100{
    width: 100%;
  }

  ::v-deep .v-dialog{
    box-shadow: none!important;
  }

</style>