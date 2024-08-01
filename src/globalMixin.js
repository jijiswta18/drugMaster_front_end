// globalMixin.js

import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/th'; // Import the Thai locale
import * as XLSX from 'xlsx';
Vue.mixin({
    data: () => ({
        catTitle : -1,
        loaderEdit : true,
        dialogFrom :false,
    }),
    computed: {
        dialogTitle () {
            // return this.catTitle === -1 ? 'สร้าง' : 'แก้ไข'
            return this.catTitle === -1 ? 'สร้าง' : 'รายละเอียดยา'
        },
    },
    methods: {
        formatDate(value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
    
        exportToExcel(file_name) {
            const fileName = file_name + '.xlsx'
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(this.filteredItems);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, fileName);
        },

        clear(){
            this.dialogFrom         = false
            this.loaderEdit         = true
            this.catTitle           = -1
            this.dataFrom           = {}
            this.$refs.form.resetValidation()
        },

        alertEdit(){
            this.$swal.fire({
                title: "อยู่ระหว่างดำเนินการ",
                // text: "That thing is still around?",
                icon: "warning"
            });
        }


    },

});
