<template>
    <div class="page-login">
        <div class="box-login">
            <div class="box-logo mb-3">
            </div>
            <h2 class="mb-7">Drug Master</h2>
            <v-form
                    ref="form"
                    class="form-login mt-2"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="login"    
                >
                    <v-row>
                        <v-col>

                            <v-text-field
                                v-model="username"
                                :rules="usernameRules"
                                label="Username รหัสพนักงาน"
                                required
                                solo
                                prepend-inner-icon="fa-solid fa-user"
                                class="style-input-login"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row no-gutters>
                        <v-col>
                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                label="Password wifi"
                                required
                                solo
                                prepend-inner-icon="fa-solid fa-lock"
                                class="style-input-login"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                autocomplete="on"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-btn 
                                class="btn-login mb-1"
                                type="submit"
                                :disabled="disabled == true"
                            >เข้าสู่ระบบ</v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-7">
                        <v-col>
                            <a class="forgot-password" href="https://passwordreset.microsoftonline.com/">Forgot your password?</a>
                        </v-col>
                    </v-row>
                 
                </v-form>
        </div>

    </div>
    
</template>
<!--  -->
<script>

// import axios from "axios";
// import Swal from 'sweetalert2';
import store  from '../store/index.js';


export default {

    data: () => ({
        dialog: false,
        valid: true,
        showPassword: false,
        disabled: false,
        check: false,
        check_user : false,
        errorMessage:'',
        username: '',
        usernameRules: [
            v => !!v || 'กรุณากรอกข้อมูล',
            // v => v.length >= 8 || 'ชื่อผู้ใช้ต้องมีอักษรอย่างน้อย 8 ตัว'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'กรุณากรอกข้อมูล',
        ],
        user: store.getters
    }),
    computed: {},
    methods: {
        encodeBase64(str) {
           return btoa(str);
        },

        async login(){

            if( this.$refs.form.validate()){

                try {
                    await store.dispatch('login',{
                        username: this.username,
                        password: this.password,
                    })

                    if(this.user.checkUser === "204")
                        {
                            await this.$swal.fire({
                            title: 'Error!',
                            text: 'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                    else{
                        this.$router.push({name: 'drug-all'});
                        // location.reload();
                        await this.$swal.fire({
                            position: 'center',
                            title: 'เข้าสู่ระบบสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                        })

                        // const expiryDate = new Date().getTime() + (60 * 60 * 1000);
                       
                        // store.dispatch('setLoginExpiry', expiryDate);

                        
                    }


                } catch (error) {
                    console.error('Error fetching data:', error);
                    await this.$swal.fire({
                        title: 'Error!',
                        text: 'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            }
          
        }
    },
}
</script>

<style scoped>
    .mt-2{
        margin-top: 2rem;
    }
    .page-login{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/927756.jpg');
        text-align: center;
    }
    .box-login{
        margin: 0 1rem;
        width: 100%;
        max-width: 450px;
        max-height: 570px;
        padding: 1.5rem;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important;
    }
    .box-logo img{
        width: 100%;
        max-width: 90px;
    }
    
    .btn-login{
        background-color: rgb(46 49 146)!important;
        color: white;
        padding: 0.25rem!important;
        width: 100%;
        height: auto!important;
        font-size: 18px!important;
    }

  
    .style-input-login ::v-deep  .v-input__slot{
        background: transparent;
        box-shadow: none!important;
        border: 1px solid #787474;;
    }
    ::v-deep .v-icon{
        font-size: 14px!important;
    }
    .w-100{
        width: 100%;
    }
    .not-match{
        background: #e7e7e7;
        text-align: center;
    }

    
</style>