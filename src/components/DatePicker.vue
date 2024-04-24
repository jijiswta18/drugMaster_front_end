

<template>

    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newDate"
              label="วันที่เริ่มต้น"
              prepend-inner-icon="mdi-calendar"
              append-inner-icon="mdi-close-circle"
              v-bind="attrs"
              v-on="on" 
              @click:clear="clearStartDate"
              dense
              outlined
              single-line
              hide-details="auto"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>


      <v-col>
        <v-menu
          ref="menuEndDate"
          v-model="menuEndDate"
          :close-on-content-click="false"
          :return-value.sync="endDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newEndDate"
              label="วันที่สิ้นสุด"
              prepend-inner-icon="mdi-calendar"
              append-inner-icon="mdi-close-circle"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="clearEndDate"
              dense
              outlined
              single-line
              hide-details="auto"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            :min="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menuEndDate = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menuEndDate.save(endDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      

    </v-row>

 
  </template>
  <script>
  export default {
    props: ['show_date'],
    data: () => ({
      // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date: null,
      menu: false,
      // endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: null,
      menuEndDate: false,
      modal: false,
      menu2: false,
      newEndDate: '',
      newDate: ''
    }),
    created(){
      this.getnewDate()
    },
    watch:{
      show_date(){            
          if(this.show_date){
            this.date = this.show_date
              
          }
      },
        date(){
          this.getnewDate()
          this.$emit("change_date",this.date)

        },
        endDate(){
          this.getnewDate()
          this.$emit("change_end_date",this.endDate)

        }
    },  


    methods:{
      getnewDate(){
        if (this.date){
            var d = new Date(this.date);
            this.newDate = d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
        }
        if(this.endDate){
          var dEnd = new Date(this.endDate);
          this.newEndDate = dEnd.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
        }
      },
      clearStartDate () {
        this.date = null
      },
      clearEndDate () {
        this.endDate = null
      },
    }
  }
</script>