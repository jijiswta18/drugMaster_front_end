<template>
<div class="drug-detail">
  <div class="top-head">
    <label class="head-font">รายละเอียดยา</label>
  </div>

  <v-card class="style-card mb-5">

    <v-container>
      <v-row>
        <v-col>
          <span class="head1">Running_No :</span> 
          <span class="head2"> {{  dataDurgDetail.Running_No }}</span>
        </v-col>
        <v-col>
          <span class="head1">Drug_Code :</span> 
          <span class="head2"> {{  dataDurgDetail.Drug_Code }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span class="head1">Drug_EnglishName :</span> 
          <span class="head2"> {{  dataDurgDetail.Drug_EnglishName }}</span>
        </v-col>
        <v-col>
          <span class="head1">Drug_ThaiName :</span> 
          <span class="head2"> {{  dataDurgDetail.Drug_ThaiName }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span class="head1">Drug_GenericName :</span> 
          <span class="head2">{{  dataDurgDetail.Drug_GenericName }}</span>
        </v-col>
        <v-col>
          <span class="head1">Drug_TradeName :</span> 
          <span class="head2"> {{  dataDurgDetail.Drug_TradeName }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <span class="head1">Drug_Catagory :</span> 
          <span class="head2"> {{  dataDurgDetail.Drug_Catagory }}</span>
        </v-col>
        <v-col>
          <span class="head1">TPU_Code :</span> 
          <span class="head2"> {{  dataDurgDetail.TPU_Code }}</span>
        </v-col>
      </v-row>

      <v-row>
       
        <v-col>
          <span class="head1">GPU_Code :</span> 
          <span class="head2"> {{  dataDurgDetail.GPU_Code }}</span>
        </v-col>
        <v-col>
          <span class="head1">Claim_Desc :</span> 
          <span class="head2"> {{  dataDurgDetail.Claim_Desc }}</span>
        </v-col>
      </v-row>
      <v-row>
       
        <v-col>
          <span class="head1">Group_Bill :</span> 
          <span class="head2"> {{  dataDurgDetail.Group_Bill }}</span>
        </v-col>
        <v-col>
          <span class="head1">SIMB :</span> 
          <span class="head2"> {{  dataDurgDetail.SIMB }}</span>
        </v-col>
      </v-row>
      <v-row>
      
        <v-col>
          <span class="head1">ClaimCat :</span> 
          <span class="head2"> {{  dataDurgDetail.ClaimCat }}</span>
        </v-col>
        <v-col>
          <span class="head1">Create_Date :</span> 
          <span class="head2"> {{  dataDurgDetail.Create_Date }}</span>
        </v-col>
      </v-row>
      <v-row>
        
        <v-col>
          <span class="head1">Create_By :</span> 
          <span class="head2"> {{  dataDurgDetail.Create_By }}</span>
        </v-col>
        <v-col>
          <span class="head1">Cxl_Date :</span> 
          <span class="head2"> {{  dataDurgDetail.Cxl_Date }}</span>
        </v-col>
      </v-row>

      <v-row>
       
        <v-col>
          <span class="head1">Cxl_By :</span> 
          <span class="head2"> {{  dataDurgDetail.Cxl_By }}</span>
        </v-col>
        <v-col>
          <span class="head1">Update_Date :</span> 
          <span class="head2"> {{  dataDurgDetail.Update_Date }}</span>
        </v-col>
      </v-row>
      <v-row>
       
        <v-col>
          <span class="head1">Update_By :</span> 
          <span class="head2"> {{  dataDurgDetail.Update_By }}</span>
        </v-col>
        <v-col>
          <span class="head1">StockInactiveCode :</span> 
          <span class="head2"> {{  dataDurgDetail.StockInactiveCode }}</span>
        </v-col>
      </v-row>
      
       
       


        <!-- <v-card-title>
         รายละเอียดยา
        </v-card-title>

        <v-card-subtitle>
          Card subtitle secondary text
        </v-card-subtitle> -->


 
    </v-container>
  </v-card>
</div>


  
</template>
<!--  -->

<script>
  import axios from "axios";
export default {
  data:() => ({
    dataDurgDetail : []
  }),
  mounted(){
    this.drugDetailById()
 
  },
  methods: {
    async drugDetailById(){
      try {
          let drug_Code = await this.$route.params.id
          let drugDetailPath = await `/api/InterfaceBrowser/GetDrugsID?Drug_Code=${drug_Code}`
          let response = await axios.get(drugDetailPath);
          this.dataDurgDetail = await response.data[0];
      } catch (error) {
          console.error('Error fetching data:', error);
      }

    },
  }
}
</script>

<style scoped>
  .drug-detail .style-card{
    text-align: left;
  }
  .drug-detail .head1{
    color: #2e3192;
    font-size: 18px;
    font-weight: 600;
  }
  
</style>