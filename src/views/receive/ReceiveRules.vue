<template>
    <div class="medicine-all">
        <div class="top-head">
            <label class="head-font">Receive</label>
        </div>
        <!-- Box Filter -->
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
                    <v-col  md="2" class="text-right">
                        <v-btn color="#f4742b" small class="btn-head" @click="dialogCreateReceiveRule">สร้างรายการ</v-btn>
                    </v-col>
                </v-row>   
            </v-container>
        </v-card>

        <v-tabs v-model="tab">
            <v-tab v-for="(item, index) in items" :key="index" @click="getReceiveRules(index)">{{ item }}</v-tab>
            <v-tab-item v-for="(item, index) in items" :key="index">
                <!-- Table Data -->
                
                <v-card class="style-card">
                    <v-data-table
                        :headers="headers"
                        :items="dataReceiveList"
                        :search="search"
                        :loading="loading"
                        loading-text="Loading... Please wait"

                    >
                        <template v-slot:[`item.action`]="{ item }">
                            <v-col cols="auto">
                                <v-btn color="#f4742b" small class="btn-action" @click="dialogUpadateReceiveRule(item)"><i class="fas fa-edit"></i></v-btn>
                            </v-col>
                        </template>
                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <!-- Form-->
        <v-dialog v-model="dialogReceiveRule" persistent max-width="700px">
            <v-form ref="formReceiveRule" validate-on="submit lazy" @submit.prevent="saveReceiveRule">

                <v-card>
                    <v-card-title class="dialog-title mb-3">
                        <span class="text-h5">{{ TitleReceiveRule }} {{ tab}}</span>
                    </v-card-title>

                    <v-card-text class="pa-0">
                        <v-container>
                            <v-row>
                    
                                <!-- input SelectionStockCode0 -->
                                <v-col cols="12" class="py-0">
                                    <p class="style-label"><span>*</span>SelectionStockCode0</p>
                                    <v-text-field
                                        v-model="dataForm.SelectionStockCode0"
                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                        label="SelectionStockCode0"
                                        dense
                                        outlined
                                        single-line
                                        clearable 
                                    ></v-text-field>
                                </v-col>

                                <!-- input EnglishName -->
                                <v-col cols="12" class="py-0">
                                    <p class="style-label"><span>*</span>EnglishName</p>
                                    <v-text-field
                                        v-model="dataForm.EnglishName"
                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                        label="EnglishName"
                                        dense
                                        outlined
                                        single-line
                                        clearable 
                                    ></v-text-field>
                                </v-col>

                                <!-- input LocalName -->
                                <v-col cols="12" class="py-0">
                                    <p class="style-label"><span>*</span>LocalName</p>
                                    <v-text-field
                                        v-model="dataForm.LocalName"
                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                        label="LocalName"
                                        dense
                                        outlined
                                        single-line
                                        clearable 
                                    ></v-text-field>
                                </v-col>

                                 <!-- select Code -->
                                <v-col cols="12" md="6" class="py-0">
                                    <p class="style-label"><span>*</span>Code</p>
                                    <v-autocomplete
                                        dense
                                        outlined
                                        single-line
                                        clearable 
                                        label="เลือกรายการ"
                                        item-text="value"
                                        item-value="id"
                                        v-model="dataForm.Code"
                                        :items="selectCode"
                                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                                        
                                        ></v-autocomplete>
                                </v-col>

                                <!-- select AdditionCode -->
                                <v-col cols="12" md="6" class="py-0">
                                    <p class="style-label"><span>*</span>AdditionCode</p>
                                    <v-select
                                        v-model="dataForm.AdditionCode"
                                        :items="selectAdditionCode"
                                        :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                                        dense
                                        outlined
                                        single-line
                                        clearable 
                                        item-text="value"
                                        item-value="id"
                                        label="เลือกรายการ"
                                    ></v-select>    
                                </v-col>

                                <!-- input ITemCheckAmt -->
                                <v-col cols="12" md="6" class="py-0">
                                    <p class="style-label"><span>*</span>ITemCheckAmt</p>
                                    <v-text-field
                                        v-model.trim="dataForm.ITemCheckAmt"
                                        :rules="[numberRule]"
                                        label="ITemCheckAmt"
                                        dense
                                        outlined
                                        single-line
                                        clearable 
                                    ></v-text-field>
                                </v-col>

                                <!-- input HNRuleITemCheckType -->
                                <v-col cols="12" md="6" class="py-0">
                                    <p class="style-label"><span>*</span>HNRuleITemCheckType</p>
                                    <v-text-field
                                        v-model.trim="dataForm.HNRuleITemCheckType"
                                        :rules="[numberRule]"
                                        label="HNRuleITemCheckType"
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
  export default {
    data() {
      return {
            tab: null,
            items: ['Medicines', 'Medicine Rule'], // You can add more tabs as needed
            search: '',
            loading: true,
            headers: [
                { text: 'Code', align: 'left', sortable: false, value: 'Code' },
                { text: 'AdditionCode', align: 'center', sortable: false, value: 'AdditionCode' },
                { text: 'SelectionStockCode0', align: 'center', sortable: false, value: 'SelectionStockCode0' },
                { text: 'EnglishName', align: 'start', sortable: false, value: 'EnglishName' },
                { text: 'LocalName', align: 'start', sortable: false, value: 'LocalName' },
                { text: 'ITemCheckAmt', align: 'center', sortable: false, value: 'ITemCheckAmt' },
                { text: 'HNRuleITemCheckType', align: 'center', sortable: false, value: 'HNRuleITemCheckType' },
                { text: 'Action', align: 'center', value: 'action' },
            ],
            dataReceiveList : [],
            dialogReceiveRule: false,
            dataForm:{},
            catReceiveRule: -1,
            selectCode: [{ value: 'ยาสำรองจ่ายข้าราชการ', id: "ยาสำรองจ่ายข้าราชการ" }], 
            selectAdditionCode: [{ value: 'MEDICINE', id: "MEDICINE" }, { value: 'ACTIVITY', id: "ACTIVITY" }], 
            numberRule: v  => {
                if (!isNaN(parseFloat(v)) && v >= 0) return true;
                return 'กรอกเป็นตัวเลขเท่านั้น';
            },
        };
    },
      
    mounted(){
        // this.getMedicineAll()
    },
    computed: {
        TitleReceiveRule () {
            return this.catReceiveRule === -1 ? 'สร้าง' : 'แก้ไข'
        },
    },
    methods: {

        getReceiveRules(id){
            switch (id) {
                case 0:
                    this.getMedicines()
                    this.dataReceiveList = []
                    break;
                case 1:
                    this.getMedicineRule()
                    this.dataReceiveList = []
                    break;
                default:
                    // Default action
                    break;
            }

        },
    
        async getMedicines(){
            try {
                this.loading        = await true

                // let medicineAllPath = '/api/ReceiveRules/GetMedicines'
                // let response        = await axios.get(medicineAllPath);

                // await setTimeout(() => {
                //     this.loading = false;
                //     this.dataReceiveList = response.data;
                // }, 300);
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },
        async getMedicineRule(){
            try {
                this.loading = true
                // let activityAllPath = '/api/ReceiveRules/GetMedicineRule'
                // let response = await axios.get(activityAllPath);
                // await setTimeout(() => {
                //     this.loading = false;
                //     this.dataReceiveList = response.data;
                // }, 300);
                
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },
        async saveReceiveRule(){

            if(this.$refs.formReceiveRule.validate()){
                
                let catAddMedicinePath     = null
                let fromData                  = null
                // Medicine
                if(this.dataForm.AdditionCode === "MEDICINE"){ 
                    fromData = await {
                        "Code"                                  : this.dataForm.Code,
                        "AdditionCode"                          : this.dataForm.AdditionCode,
                        "Suffix"                                : 2,
                        "EnglishName"                           : this.dataForm.EnglishName,
                        "LocalName"                             : this.dataForm.LocalName,
                        "CoverChargePercent"                    : 100.0,
                        "CoverChargeRoundType"                  : 0,
                        "HereExcluded"                          : 0,
                        "HNRuleITemCheckType"                   : this.dataForm.ITemCheckAmt,
                        "ITemCheckAmt"                          : this.dataForm.ITemCheckAmt,
                        "LimitAmt"                              : 0.0,
                        "SelectionStockCode0"                   : "1200000022",
                        "SelectionStockCode1"                   : "1200000023",
                        "SelectionStockCode2"                   : "1200001045",
                        "SelectionStockCode3"                   : "1200000820",
                        "SelectionStockCode4"                   : null,
                        "SelectionStockCode5"                   : null,
                        "SelectionStockCode6"                   : null,
                        "SelectionStockCode7"                   : null,
                        "SelectionStockComposeCategoryCode0"    : null,
                        "SelectionStockComposeCategoryCode1"    : null,
                        "SelectionStockComposeCategoryCode2"    : null,
                        "SelectionStockComposeCategoryCode3"    : null,
                        "xxxxxxxMaxAmtIpd"                      : 0.0,
                        "xxxxxxxMaxAmtOpd"                      : 0.0,
                        "CreateDateTime"                        : "2024-04-19T10:59:03.447",
                        "CreateByUserID"                        : "806032",
                        "UpdateDateTime"                        : null,
                        "UpdateByUserID"                        : null,
                        "BatchUpdateDateTime"                   : "2024-04-25T00:00:09.89"
                    }
                    catAddMedicinePath  =   '/api/MedicineRules/AddMedicineRules'
                // Avtivity
                }else{
                    fromData = await {
                        "Code"                              : this.dataForm.Code,
                        "AdditionCode"                      : this.dataForm.AdditionCode,
                        "Suffix"                            : 1,
                        "EnglishName"                       : this.dataForm.EnglishName,
                        "LocalName"                         :  this.dataForm.LocalName,
                        "CoverChargePercent"                : 0.0,
                        "CoverChargeRoundType"              : 0,
                        "HereExcluded"                      : 0,
                        "HNRuleITemCheckType"               : this.dataForm.HNRuleITemCheckType,
                        "ITemCheckAmt"                      : this.dataForm.ITemCheckAmt,
                        "LimitAmt"                          : 0.0,
                        "NoDays"                            : 0,
                        "PlanLimitAmt0"                     : 0.0,
                        "PlanLimitAmt1"                     : 0.0,
                        "PlanLimitAmt2"                     : 0.0,
                        "PlanLimitAmt3"                     : 0.0,
                        "PlanLimitAmt4"                     : 0.0,
                        "PlanLimitAmt5"                     : 0.0,
                        "PlanLimitAmt6"                     : 0.0,
                        "PlanLimitAmt7"                     : 0.0,
                        "SelectionActivityCategoryExt0"     : null,
                        "SelectionActivityCategoryExt1"     : null,
                        "SelectionActivityCategoryExt2"     : null,
                        "SelectionActivityCategoryExt3"     : null,
                        "SelectionActivityCategoryExt4"     : null,
                        "SelectionActivityCategoryExt5"     : null,
                        "SelectionActivityCategoryExt6"     : null,
                        "SelectionActivityCategoryExt7"     : null,
                        "SelectionActivityCategoryExt8"     : null,
                        "SelectionActivityCategoryExt9"     : null,
                        "SelectionActivityCategoryExt10"    : null,
                        "SelectionActivityCategoryExt11"    : null,
                        "SelectionActivityCategoryExt12"    : null,
                        "SelectionActivityCategoryExt13"    : null,
                        "SelectionActivityCategoryExt14"    : null,
                        "SelectionActivityCategoryExt15"    : null,
                        "SelectionActivityCategoryExt16"    : null,
                        "SelectionActivityCategoryExt17"    : null,
                        "SelectionActivityCategoryExt18"    : null,
                        "SelectionActivityCategoryExt19"    : null,
                        "SelectionActivityCategory0"        : null,
                        "SelectionActivityCategory1"        : null,
                        "SelectionActivityCategory2"        : null,
                        "SelectionActivityCategory3"        : null,
                        "SelectionActivityCategory4"        : null,
                        "SelectionActivityCategory5"        : null,
                        "SelectionActivityCategory6"        : null,
                        "SelectionActivityCategory7"        : null,
                        "SelectionActivityCategory8"        : null,
                        "SelectionActivityCategory9"        : null,
                        "SelectionActivityCodeExt0"         : null,
                        "SelectionActivityCodeExt1"         : null,
                        "SelectionActivityCodeExt2"         : null,
                        "SelectionActivityCodeExt3"         : null,
                        "SelectionActivityCodeExt4"         : null,
                        "SelectionActivityCodeExt5"         : null,
                        "SelectionActivityCodeExt6"         : null,
                        "SelectionActivityCodeExt7"         : null,
                        "SelectionActivityCodeExt8"         : null,
                        "SelectionActivityCodeExt9"         : null,
                        "SelectionActivityCodeExt10"        : null,
                        "SelectionActivityCodeExt11"        : null,
                        "SelectionActivityCodeExt12"        : null,
                        "SelectionActivityCodeExt13"        : null,
                        "SelectionActivityCodeExt14"        : null,
                        "SelectionActivityCodeExt15"        : null,
                        "SelectionActivityCodeExt16"        : null,
                        "SelectionActivityCodeExt17"        : null,
                        "SelectionActivityCodeExt18"        : null,
                        "SelectionActivityCodeExt19"        : null,
                        "SelectionActivityCode0"            : "28001",
                        "SelectionActivityCode1"            : null,
                        "SelectionActivityCode2"            : null,
                        "SelectionActivityCode3"            : null,
                        "SelectionActivityCode4"            : null,
                        "SelectionActivityCode5"            : null,
                        "SelectionHospitalTypeOfActivity0"  : 0,
                        "SelectionHospitalTypeOfActivity1"  : 0,
                        "SelectionHospitalTypeOfActivity2"  : 0,
                        "ionHospitalTypeOfActivity3"  : 0,
                        "xxxxxxxMaxAmtIpd"                  : 0.0,
                        "CreateDateTime"                    : "2024-04-24T09:12:54.313",
                        "CreateByUserID"                    : "806032",
                        "UpdateDateTime"                    : null,
                        "UpdateByUserID"                    : null,
                        "BatchUpdateDateTime"               : "2024-04-25T02:59:18.527"
                    }
                    catAddMedicinePath  =   '/api/MedicineRules/AddActivityRules'
                }
                await axios.post(catAddMedicinePath, fromData)
            
            }
        },
        dialogUpadateReceiveRule(value){
            console.log(value);
            this.dataForm           = value
            this.dialogReceiveRule  = true
            this.catReceiveRule     = 0
        },
        dialogCreateReceiveRule(){
            this.dialogReceiveRule  = true
 
        },
        clear(){
            this.dialogReceiveRule              = false
            this.catReceiveRule                 = -1
            this.dataForm = {}
            this.$refs.formReceiveRule.resetValidation()
        },

        


    }
  };
  </script>
  <style scoped>

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
  