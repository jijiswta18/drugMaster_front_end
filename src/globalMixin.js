// globalMixin.js

import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/th'; // Import the Thai locale

Vue.mixin({
    data: () => ({
        catTitle : -1,
        loaderEdit : true,
        dialogForm: false,
        dataForm: {},
    }),
  
    methods: {
        formatDate(value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
    
        clear(){
            this.dialogForm         = false
            this.loaderEdit         = true
            this.catTitle           = -1
            this.dataForm           = {}
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
