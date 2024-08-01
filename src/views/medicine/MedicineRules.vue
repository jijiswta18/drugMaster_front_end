<template>
    <div class="medicine-all">
        <div class="top-head">
            <label class="head-font">Medicine</label>
        </div>

        <!-- Box Filter -->
        <v-card class="style-card mb-5">
            <v-container>
                <v-row>
                    <v-col cols="12" md="10">
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
                    <v-col cols="12"  md="2" class="text-right">
                        <v-btn color="#f4742b" small class="btn-head w-100 disabled" @click="dialogCreateReceiveRule">สร้างรายการ</v-btn>
                    </v-col>
                </v-row>   
            </v-container>
        </v-card>

        <v-tabs v-model="tab">
            <v-tab v-for="(item, index) in items" :key="index" @click="getMedicineRules(index)">{{ item }}</v-tab>
            <v-tab-item v-for="(item, index) in items" :key="index">
                
                <!-- Table Data -->
                <v-card class="style-card">
                    <v-data-table
                        :headers="headers"
                        :items="dataMedicineList"
                        :search="search"
                        :loading="loading"
                        loading-text="Loading... Please wait"
                        :footer-props="{ 'items-per-page-options': [10, 20, 30, 100] }"
                        class="style-table"

                    >
                        <template v-slot:[`item.action`]="{ item }">
                            <v-col cols="auto">
                                <v-btn color="#f4742b" small class="btn-action" @click="dialogUpadateReceiveRule(item)"><i class="fas fa-edit f-16"></i></v-btn>
                            </v-col>
                        </template>
                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <!-- Form-->
        <v-dialog v-model="dialogFrom" persistent max-width="700px">
            <LoaderData v-if="loaderEdit && catTitle == 0"/> 
            <v-form v-else ref="form" validate-on="submit lazy" @submit.prevent="saveReceiveRule">
                <v-card>
                    <v-toolbar class="head-toolbar">
                        <v-toolbar-title class="color-white">{{ dialogTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="clear">
                            <i class="far fa-window-close toolbar-icon"></i>
                        </v-btn>
                    </v-toolbar>
                  
                    <!-- <v-card-text class="pa-0"> -->
                    <v-container>
                        <v-row class="pt-2">
                            <!-- input SelectionStockCode0 -->
                            <v-col cols="12" class="py-0">
                                <p class="style-label"><span>*</span>SelectionStockCode0</p>
                                <v-text-field
                                    v-model="dataFrom.SelectionStockCode0"
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
                                    v-model="dataFrom.EnglishName"
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
                                    v-model="dataFrom.LocalName"
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
                                    v-model="dataFrom.Code"
                                    :items="selectCode"
                                    :rules="[v => !!v || 'กรุณาเลือกรายการ']"
                                    
                                    ></v-autocomplete>
                            </v-col>

                            <!-- select AdditionCode -->
                            <v-col cols="12" md="6" class="py-0">
                                <p class="style-label"><span>*</span>AdditionCode</p>
                                <v-select
                                    v-model="dataFrom.AdditionCode"
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
                                    v-model.trim="dataFrom.ITemCheckAmt"
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
                                    v-model.trim="dataFrom.HNRuleITemCheckType"
                                    :rules="[numberRule]"
                                    label="HNRuleITemCheckType"
                                    dense
                                    outlined
                                    single-line
                                    clearable 
                                ></v-text-field>
                            </v-col>
                        
                        </v-row>

                        <v-card-actions class="dialog-action px-0 py-0">
                            <v-spacer></v-spacer>
                            <!-- <v-btn variant="text" class="btn-save" type="submit">บันทึก</v-btn> -->
                            <v-btn variant="text" class="btn-cancel" @click="clear">ยกเลิก</v-btn>
                        </v-card-actions>

                    </v-container>
                    <!-- </v-card-text> -->
                  
                </v-card>

            </v-form>
        </v-dialog>
    </div>
  </template>
  
  <script>

  import LoaderData from '@/components/LoaderData.vue';
  export default {
     components: {LoaderData},
    data() {
      return {
            tab: null,
            items: ['Medicine', 'Activity'], // You can add more tabs as needed
            search: '',
            loading: true,
            headers: [
                { text: 'Code', align: 'left',  value: 'Code' },
                { text: 'Addition Code', align: 'center',  value: 'AdditionCode' },
                { text: 'Selection StockCode0', align: 'center',  value: 'SelectionStockCode0' },
                { text: 'English Name', align: 'start',  value: 'EnglishName' },
                { text: 'Local Name', align: 'start',  value: 'LocalName' },
                { text: 'ITem CheckAmt', align: 'center',  value: 'ITemCheckAmt' },
                { text: 'HNRuleITemCheckType', align: 'center',  value: 'HNRuleITemCheckType' },
                { text: 'Action', align: 'center', value: 'action' },
            ],
            dataMedicineList : [],
            dataFrom:{},
            selectCode: [], 
            selectAdditionCode: [{ value: 'MEDICINE', id: "MEDICINE" }, { value: 'ACTIVITY', id: "ACTIVITY" }], 
            numberRule: v  => {
                if (!isNaN(parseFloat(v)) && v >= 0) return true;
                return 'กรอกเป็นตัวเลขเท่านั้น';
            },
        };
    },
      
    mounted(){
        this.getMedicineAll()
    },
   
    methods: {
        getMedicineRules(id){
            switch (id) {
                case 0:
                    this.getMedicineAll()
                    this.dataMedicineList = []
                    break;
                case 1:
                    this.getActivityAll()
                    this.dataMedicineList = []
                    break;
                default:
                    // Default action
                    break;
            }

        },

        dialogCreateReceiveRule(){
            this.getSelectcodeRule()
            this.dialogFrom  = true
        },

        async getSelectcodeRule(){
            let codeRulePath    = `/api/MedicineRules/GetcodeRule`
            let response        = await this.$axios.get(`${codeRulePath}`)

            await response.data.forEach(async item => {
                await this.selectCode.push({'id':item.Code, 'value':item.Code})
            })

        },

        async getMedicineAll(){
            try {
                this.loading        = await true
                let medicineAllPath = `/api/MedicineRules/GetMedicineAll`
                let response        = await this.$axios.get(`${medicineAllPath}`);

                setTimeout(() => {
                    this.loading = false;
                    this.dataMedicineList = response.data;
                }, 500);
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },

        async getActivityAll(){
            try {
                this.loading = true
                let activityAllPath = `/api/MedicineRules/GetActivityAll`
                let response = await this.$axios.get(`${activityAllPath}`);
                setTimeout(() => {
                    this.loading = false;
                    this.dataMedicineList = response.data;
                }, 500);
                
            } catch (error) {
                this.loading = await false
                console.error('Error fetching data:', error);
            }
        },

        async saveReceiveRule(){

            // globalMixin
            this.alertEdit()
            this.clear()

            /* ยังไม่มีเส้น API */
            // if(this.$refs.form.validate()){
                
            //     let catAddMedicinePath     = null
            //     let fromData               = null
            //     // Medicine
            //     if(this.dataFrom.AdditionCode === "MEDICINE"){ 
            //         fromData = {
            //             "Code"                                  : this.dataFrom.Code,
            //             "AdditionCode"                          : this.dataFrom.AdditionCode,
            //             "Suffix"                                : 2,
            //             "EnglishName"                           : this.dataFrom.EnglishName,
            //             "LocalName"                             : this.dataFrom.LocalName,
            //             "CoverChargePercent"                    : 100.0,
            //             "CoverChargeRoundType"                  : 0,
            //             "HereExcluded"                          : 0,
            //             "HNRuleITemCheckType"                   : this.dataFrom.ITemCheckAmt,
            //             "ITemCheckAmt"                          : this.dataFrom.ITemCheckAmt,
            //             "LimitAmt"                              : 0.0,
            //             "SelectionStockCode0"                   : "1200000022",
            //             "SelectionStockCode1"                   : "1200000023",
            //             "SelectionStockCode2"                   : "1200001045",
            //             "SelectionStockCode3"                   : "1200000820",
            //             "SelectionStockCode4"                   : null,
            //             "SelectionStockCode5"                   : null,
            //             "SelectionStockCode6"                   : null,
            //             "SelectionStockCode7"                   : null,
            //             "SelectionStockComposeCategoryCode0"    : null,
            //             "SelectionStockComposeCategoryCode1"    : null,
            //             "SelectionStockComposeCategoryCode2"    : null,
            //             "SelectionStockComposeCategoryCode3"    : null,
            //             "xxxxxxxMaxAmtIpd"                      : 0.0,
            //             "xxxxxxxMaxAmtOpd"                      : 0.0,
            //             "CreateDateTime"                        : "2024-04-19T10:59:03.447",
            //             "CreateByUserID"                        : "806032",
            //             "UpdateDateTime"                        : null,
            //             "UpdateByUserID"                        : null,
            //             "BatchUpdateDateTime"                   : "2024-04-25T00:00:09.89"
            //         }
            //         catAddMedicinePath  =   '/api/MedicineRules/AddMedicineRules'
            //     // Avtivity
            //     }else{
            //         fromData = {
            //             "Code"                              : this.dataFrom.Code,
            //             "AdditionCode"                      : this.dataFrom.AdditionCode,
            //             "Suffix"                            : 1,
            //             "EnglishName"                       : this.dataFrom.EnglishName,
            //             "LocalName"                         :  this.dataFrom.LocalName,
            //             "CoverChargePercent"                : 0.0,
            //             "CoverChargeRoundType"              : 0,
            //             "HereExcluded"                      : 0,
            //             "HNRuleITemCheckType"               : this.dataFrom.HNRuleITemCheckType,
            //             "ITemCheckAmt"                      : this.dataFrom.ITemCheckAmt,
            //             "LimitAmt"                          : 0.0,
            //             "NoDays"                            : 0,
            //             "PlanLimitAmt0"                     : 0.0,
            //             "PlanLimitAmt1"                     : 0.0,
            //             "PlanLimitAmt2"                     : 0.0,
            //             "PlanLimitAmt3"                     : 0.0,
            //             "PlanLimitAmt4"                     : 0.0,
            //             "PlanLimitAmt5"                     : 0.0,
            //             "PlanLimitAmt6"                     : 0.0,
            //             "PlanLimitAmt7"                     : 0.0,
            //             "SelectionActivityCategoryExt0"     : null,
            //             "SelectionActivityCategoryExt1"     : null,
            //             "SelectionActivityCategoryExt2"     : null,
            //             "SelectionActivityCategoryExt3"     : null,
            //             "SelectionActivityCategoryExt4"     : null,
            //             "SelectionActivityCategoryExt5"     : null,
            //             "SelectionActivityCategoryExt6"     : null,
            //             "SelectionActivityCategoryExt7"     : null,
            //             "SelectionActivityCategoryExt8"     : null,
            //             "SelectionActivityCategoryExt9"     : null,
            //             "SelectionActivityCategoryExt10"    : null,
            //             "SelectionActivityCategoryExt11"    : null,
            //             "SelectionActivityCategoryExt12"    : null,
            //             "SelectionActivityCategoryExt13"    : null,
            //             "SelectionActivityCategoryExt14"    : null,
            //             "SelectionActivityCategoryExt15"    : null,
            //             "SelectionActivityCategoryExt16"    : null,
            //             "SelectionActivityCategoryExt17"    : null,
            //             "SelectionActivityCategoryExt18"    : null,
            //             "SelectionActivityCategoryExt19"    : null,
            //             "SelectionActivityCategory0"        : null,
            //             "SelectionActivityCategory1"        : null,
            //             "SelectionActivityCategory2"        : null,
            //             "SelectionActivityCategory3"        : null,
            //             "SelectionActivityCategory4"        : null,
            //             "SelectionActivityCategory5"        : null,
            //             "SelectionActivityCategory6"        : null,
            //             "SelectionActivityCategory7"        : null,
            //             "SelectionActivityCategory8"        : null,
            //             "SelectionActivityCategory9"        : null,
            //             "SelectionActivityCodeExt0"         : null,
            //             "SelectionActivityCodeExt1"         : null,
            //             "SelectionActivityCodeExt2"         : null,
            //             "SelectionActivityCodeExt3"         : null,
            //             "SelectionActivityCodeExt4"         : null,
            //             "SelectionActivityCodeExt5"         : null,
            //             "SelectionActivityCodeExt6"         : null,
            //             "SelectionActivityCodeExt7"         : null,
            //             "SelectionActivityCodeExt8"         : null,
            //             "SelectionActivityCodeExt9"         : null,
            //             "SelectionActivityCodeExt10"        : null,
            //             "SelectionActivityCodeExt11"        : null,
            //             "SelectionActivityCodeExt12"        : null,
            //             "SelectionActivityCodeExt13"        : null,
            //             "SelectionActivityCodeExt14"        : null,
            //             "SelectionActivityCodeExt15"        : null,
            //             "SelectionActivityCodeExt16"        : null,
            //             "SelectionActivityCodeExt17"        : null,
            //             "SelectionActivityCodeExt18"        : null,
            //             "SelectionActivityCodeExt19"        : null,
            //             "SelectionActivityCode0"            : "28001",
            //             "SelectionActivityCode1"            : null,
            //             "SelectionActivityCode2"            : null,
            //             "SelectionActivityCode3"            : null,
            //             "SelectionActivityCode4"            : null,
            //             "SelectionActivityCode5"            : null,
            //             "SelectionHospitalTypeOfActivity0"  : 0,
            //             "SelectionHospitalTypeOfActivity1"  : 0,
            //             "SelectionHospitalTypeOfActivity2"  : 0,
            //             "SelectionHospitalTypeOfActivity3"  : 0,
            //             "xxxxxxxMaxAmtIpd"                  : 0.0,
            //             "CreateDateTime"                    : "2024-04-24T09:12:54.313",
            //             "CreateByUserID"                    : "806032",
            //             "UpdateDateTime"                    : null,
            //             "UpdateByUserID"                    : null,
            //             "BatchUpdateDateTime"               : "2024-04-25T02:59:18.527"
            //         }
            //         catAddMedicinePath  =   '/api/MedicineRules/AddActivityRules'
            //     }
            //     await this.$axios.post(catAddMedicinePath, fromData)
            
            // }
            
        },

        async dialogUpadateReceiveRule(value){
            this.catTitle           =  0
            this.dialogFrom  =  true

            setTimeout(() => {
            
                this.loaderEdit     = false;
                this.dataFrom       =  JSON.parse(JSON.stringify(value));
                this.getSelectcodeRule()
           
            }, 500);
           
           
            // this.dialogFrom  =  true
            // this.catTitle     =  0
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
  ::v-deep .v-dialog{
    box-shadow: none!important;
  }
  .w-100{
    width: 100%;
  }


</style>
  