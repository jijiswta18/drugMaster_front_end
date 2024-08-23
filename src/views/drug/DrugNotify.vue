<template>
    <div class="drug-all">
      <div class="top-head">
        <label class="head-font">Drug Notify</label>
      </div>
      <v-card class="style-card mb-5">
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="ค้นหา (Message Memo, Stock Code)"
                dense
                outlined
                single-line
                hide-details="auto"
                clearable 
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2" class="text-right">
              <v-btn color="#f4742b" small class="btn-head w-100"  @click="dialogForm = true">สร้างรายการ</v-btn>
            </v-col>
            <v-col cols="6" md="2" class="text-right">
              <v-btn small color="#4caf50" class="btn-export w-100" @click="exportToExcel('report-DrugNotify')">Export Excel</v-btn>
            </v-col>
          </v-row>   
          <v-row>
            <v-col cols="12" md="8">

                <v-file-input
                    v-model="file"
                    label="เลือกไฟล์"
                    accept=".xlsx, .xls"
                    hide-details="auto"
                    single-line
                    show-size
                    outlined
                    dense
                    prepend-inner-icon="mdi-file-upload"
                     class="custom-file-input"
                ></v-file-input>
                
                <!-- <v-file-input 
                    v-model="file"
                    :accept="acceptTypes"
                    show-size
                    outlined
                    dense
                    label="Import File"
                    hide-details="auto"
                    single-line
                ></v-file-input> -->
            </v-col>

            
           
            <v-col cols="12" md="4" class="text-right">
                <v-btn @click="uploadFile"  color="#223E7E" class="btn-export w-100" :disabled="!file">อัพโหลดไฟล์</v-btn>
                <!-- <v-btn small color="#223E7E" class="btn-export w-100" @click="uploadFile">Upload File</v-btn> -->
            </v-col>
            
          </v-row>   
        </v-container>
      </v-card>
  
        <!-- Table -->
      <v-card class="style-card">
     
        <v-data-table
            :headers="headers"
            :items="datas"
            :search="search"
            :loading="loading"
            loading-text="Loading... Please wait"
            :footer-props="{ 'items-per-page-options': [10, 20, 30, 100] }"
            class="style-table"
  
        >


          <template v-slot:[`item.Create_Date`]="{ item }">{{ formatDate(item.Create_Date )}}</template>
          <template v-slot:[`item.action`]="{ item }">
            <v-col cols="auto">
            <v-btn color="#f4742b" small class="btn-action mr-1" @click="dialogUpdate(item)"><i class="fas fa-edit f-16"></i></v-btn>
            <!-- <v-btn color="#223E7E" small class="btn-check" @click="dialogDrugsPrice(item.Drug_Code)"><i class="fas fa-money-check-alt color-white f-16"></i></v-btn> -->
            </v-col>
          
          </template>
  
        </v-data-table>
  
      </v-card>
  
       <!-- Form Create, Update -->
       <v-dialog v-model="dialogForm" persistent max-width="700px">
        <LoaderData v-if="loaderEdit && catTitle == 0"/>
          <v-form v-else ref="form" validate-on="submit lazy" @submit.prevent="saveDrugNotify">
              <v-card>
                <v-toolbar class="head-toolbar">
                  <v-toolbar-title class="color-white">{{ dialogTitle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="clearDrugNotify">
                      <i class="far fa-window-close toolbar-icon"></i>
                    </v-btn>
                </v-toolbar>
                <v-container>
                    <v-row class="pt-2">
                      
                      <!-- input messageMemo -->
                      <v-col cols="12" md="12" class="py-0">
                          <p class="style-label"><span>*</span>Message Memo</p>
                          <v-text-field
                              v-model="dataForm.MessageMemo"
                              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                              label="Message Memo"
                              dense
                              outlined
                              single-line
                              clearable 
                          ></v-text-field>
                      </v-col>
  
                      <!-- input stockCode -->
                      <v-col cols="12" md="12" class="py-0">
                          <p class="style-label"><span>*</span>Stock Code</p>
                        <v-autocomplete
                            v-model="StockCode"
                            :items="selectStockCode"
                            :search-input.sync="searchStockCode"
                            :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                            dense
                            outlined
                            single-line
                            clearable
                            item-text="Drug_Code"
                            item-value="Drug_Code"
                            label="เลือกรายการ"
                            :loading="loadingSelect"
                            :loading-text="'กำลังโหลด...'"
                            @click="getStockCode"
                           :class="{ 'disabled': catTitle === 0 }"
                        ></v-autocomplete>
                      </v-col>

                    <!-- input StockMemoMessageType -->
                      <v-col cols="12" md="6" class="py-0">
                        <p class="style-label"><span>*</span>Stock Memo Message Type</p>
                        <v-select
                            v-model="StockMemoMessageType"
                            :items="selectStockMemoMessageType"
                            :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                            dense
                            outlined
                            single-line
                            clearable 
                            item-text="value"
                            item-value="value"
                            label="เลือกรายการ"
                            :class="{ 'disabled': catTitle === 0 }"
                        ></v-select>
                      </v-col>

                        <!-- input StockMemoMessageName -->
                      <v-col cols="12" md="6" class="py-0">
                        <p class="style-label"><span>*</span>Stock Memo Message Name</p>
                        <v-text-field
                              v-model="dataForm.StockMemoMessageName"
                              label="Stock Memo Message Name"
                              dense
                              outlined
                              single-line
                              clearable 
                              class="disabled"
                          ></v-text-field>
                       
                    </v-col>
  
                    
  
                    </v-row>
                    <v-card-actions class="dialog-action px-0 py-0">
                      <v-spacer></v-spacer>
                        <!-- ปุ่ม สร้างและแก้ไข-->
                        <v-btn variant="text" class="btn-save" type="submit">บันทึก</v-btn>
                        <v-btn variant="text" class="btn-cancel" @click="clearDrugNotify">ยกเลิก</v-btn>
                      </v-card-actions>
                </v-container>
  
                  
              </v-card>
  
          </v-form>
        </v-dialog>

    </div>
  
  </template>
  
  
  <script>
    import * as XLSX from 'xlsx';
    import LoaderData from '@/components/LoaderData.vue';
    export default {
      components: {LoaderData},
      data : () => ({
        search: '',
        searchStockCode: '',
        loading: true,
        loadingSelect: false,
        datas: [],
        datasDurg: [],
        file: null,
        StockCode: null,
        StockMemoMessageType: null,
        headers: [
            { text: 'Message Memo', align: 'left', value: 'MessageMemo'},
            { text: 'Stock Code', align: 'center', value: 'StockCode', width: '10%'},
            { text: 'Stock Memo Message Type', align: 'center', value: 'StockMemoMessageType', width: '18%', sortable: true},
            { text: 'Stock Memo Message Name', align: 'start', value: 'StockMemoMessageName', width: '18%', sortable: true},
            { text: 'Store', align: 'center', value: 'Store', width: '7%', sortable: true},
            {text: 'Action', align: 'center', value: 'action', width: '5%'},
        ],
        selectStockMemoMessageType: [
            { text: 'Always_Notify', value: 1 }, 
            { text: 'Specifications', value: 2 },
            { text: 'General_Instruction', value: 3 },
            { text: 'General_Instruction', value: 4 },
            { text: 'General_Remarks', value: 5 },
            { text: 'Indications', value: 8 },
            { text: 'Adverse_Reactions', value: 9 },
            { text: 'Patient_Education', value: 10 },
            { text: 'Ingredients', value: 11 },
            { text: 'Administration', value: 12 },
            { text: 'Constrain', value: 13 },
            { text: 'Direction', value: 14 },
            { text: 'Always_Notify_Front', value: 16 },
            { text: 'Always_Notify_Back', value: 17 },
            { text: 'Always_Notify_Purchase', value: 18 },
            { text: 'Always_Notify_Receive', value: 19 },
            { text: 'MIM', value: 20 },
            { text: 'Drug_Information', value: 21 },
        ], 
        selectStockCode: [],

      }), 
      mounted(){
        this.getListDrugNotify()
      },

      watch: {
        StockMemoMessageType(newVal) {
        const selectedItem = this.selectStockMemoMessageType.find(item => item.value === newVal);
            if (selectedItem) {
                this.dataForm.StockMemoMessageName = selectedItem.text;
            } else {
                this.dataForm.StockMemoMessageName = '';
            }
        },
       
    },

    
      computed: {
        filteredItems() {
            const searchQuery = this.search ? this.search.toLowerCase() : '';
            return this.datas.filter(item => {
            const searchMatch = (
            item.MessageMemo.toLowerCase().includes(searchQuery) || // Example for Drug_Code
            item.StockCode.toLowerCase().includes(searchQuery) // Example for another field
            );
            return (
                searchMatch 
            );
            });
        },
        dialogTitle () {
            return this.catTitle === -1 ? 'สร้าง' : 'แก้ไข'
        },
  
      },
  
      methods: {
        clearDrugNotify(){
            this.clear()
            this.StockMemoMessageType = null
            this.StockCode = null
        },

        exportToExcel() {
            const datas = this.filteredItems.map(item => ({
                "Message Memo": item.MessageMemo,
                "Stock Code": item.StockCode,
                "Stock Memo Message Type": item.StockMemoMessageType,
                "Stock Memo Message Name": item.StockMemoMessageName,
                "Store": item.Store,
            }));

            const fileName = 'DrugNotify.xlsx';
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(datas);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            XLSX.writeFile(wb, fileName);

        },

        async dialogUpdate(value) {
            this.dialogForm = true;
            this.catTitle = 0;
            this.loaderEdit = true;

            await this.getStockCode();
            this.$nextTick(() => {
                this.dataForm = { ...value }; 
                this.StockMemoMessageType = value.StockMemoMessageType; 
                this.StockCode = value.StockCode;
                this.loaderEdit = false;
            });
        },

        async getStockCode() {
            this.loadingSelect = true; // ตั้งค่าการโหลดเป็น true
            try {
                const drugPath = '/api/InterfaceBrowser/GetDrugs';
                const response = await this.$axios.get(drugPath);
                
                this.selectStockCode = response.data; // อัพเดตรายการ stock code

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.loadingSelect = false; // ตั้งค่าการโหลดเป็น false
            }
        },


        async getListDrugNotify(){
          try {
              let DrugNotifyPath  = `/api/InterfaceBrowser/GetDrugNotify`
              let response        = await this.$axios.get(`${DrugNotifyPath}`);
              this.datas          = await response.data;
              this.loading        = await false
              
          } catch (error) {
              this.loading        = await false
              console.error('Error fetching data:', error);
          }
        },

        async saveDrugNotify(){
            try {
                if(this.$refs.form.validate()){

                const data = [
                    {
                        "store": ".",
                        "stockCode": this.StockCode,
                        "stockMemoMessageType": this.StockMemoMessageType,
                        // "stockMemoMessageName": this.dataForm.StockMemoMessageName,
                        "messageMemo": this.dataForm.MessageMemo
                    }
                ];

                console.log(data);
                

                const drugNotifyPath =  await `/api/InterfaceBrowser/UpdateDrugNotify`

                await this.$axios.post(`${drugNotifyPath}`, data)

                this.$swal.fire({
                    title: 'Success!',
                    text: 'Your data has been saved successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.clearDrugNotify()
                        this.getListDrugNotify()
                    }
                });

            }
            } catch (error) {
            console.log('saveDrugs',error);
            }
        
        },

        
        async uploadFile() {
            if (!this.file) return;
            // Create FormData object
            const formData = new FormData();
            formData.append('excelFile', this.file);

            try {
                await this.$axios.post(`/api/InterfaceBrowser/FileDrugNotify`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Required for file uploads
                }
                });


                await this.$swal.fire({
                    title: 'Success!',
                    text: 'Your file has been uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                    this.file = null
                    this.getListDrugNotify()
                    }
                });
              
            } catch (error) {
                console.error('Error uploading file:', error);
                 // Show error notification
                await  this.$swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while uploading the file.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                    });
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

    ::v-deep  table {
      
        white-space: pre-line!important;
    }
    ::v-deep table td {
      padding-top:  0.5rem!important;
      padding-bottom:  0.5rem!important;
    }
    ::v-deep .custom-file-input .v-input__prepend-outer {
        display: none; /* Hide the outer prepend icon */
    }
  </style>