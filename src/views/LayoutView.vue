<template>
    <v-app id="app">
      <v-navigation-drawer class="sidebar" v-model="drawer" app>
        <v-list-item >
          <v-list-item-content class="head-menuhome">
          </v-list-item-content>
        </v-list-item>

        <v-list class="mt-5" dense nav>  
          <router-link 
            class="d-flex align-center menu-link"
            active-class="activemenu"
            :to="{ name: 'drug-all'}"
          >
            <v-list-item link>
              <i class="far fa-list-alt menu-icon"></i>
              <v-list-item-content>
                <v-list-item-title class="menu-text">
                  Drug
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
  
          <router-link 
            class="d-flex align-center menu-link"
            active-class="activemenu"
            :to="{ name: 'medicine-rules'}"
          >
            <v-list-item link>
              <i class="far fa-list-alt menu-icon"></i>
              <v-list-item-content>
                <v-list-item-title class="menu-text">
                  Medicine Rules
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>


  
        </v-list>

  
      </v-navigation-drawer>
        <v-app-bar app class="navbar">
          <div class="style-navbar">
         
          <v-app-bar-nav-icon class="navbar-icon" @click="drawer = !drawer"></v-app-bar-nav-icon>
        
          <v-spacer></v-spacer>
         
          <p class="mb-0 mr-2">{{ user.full_name }}</p>
          <v-btn depressed rounded text @click="logout" class="btn-logout"><i class="fas fa-sign-out-alt"></i> ออกจากระบบ </v-btn>

        </div>
        </v-app-bar>
      <v-main class="main">
        <div class="container-page">
          <router-view></router-view>
        </div>

      </v-main>
    </v-app>
  </template>

  <script>
  import store from '../store/index.js';
    export default {
      name: "MyHome",
      data: () => ({
          dialog: false,
          drawer: true,
          submenu: null,
          user: store.getters.user,
          becomeLOs: [
            ['Medicines'],
            ['Medicines Rules'],
          ],
      }),
     
      methods: {
        toggleSubMenu(item) {
          if (this.submenu === item) {
            this.submenu = null;
          } else {
            this.submenu = item;
          }
        },
        homeUser(){
          this.$router.push("/user/login");
        },
  
        async logout() {
          this.$swal.fire({
            icon: "warning",
            title: "คุณต้องการออกจากระบบ",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: `ยกเลิก`
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              await store.dispatch("logout");

              await this.$router.push("/login");
              // await location.reload();

            } else if (result.isDenied) {
              this.$swal.fire("Changes are not saved", "", "info");
            }
          });
        }
      },
    
  }
  </script>
  <style>
   
    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-light.woff") format("woff");
      font-weight: 200;
    }

    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-regular.woff") format("woff");
      font-weight: 500;
    }

    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-medium.woff") format("woff");
      font-weight: 400;
    }

    @font-face {
      font-family: "chulabhornlikittext";
      src: url("@/assets/fonts/Chulabhorn_Likit/chulabhornlikittext-bold.woff") format("woff");
      font-weight: 700;
    }



    #app {
      font-size: 18px;
      font-family: 'chulabhornlikittext', sans-serif;
    }


    .container-page{
      padding: 1rem;
    }

    .sidebar{
      /* background-image: url('@/assets/927756.jpg'); */
      background: #223E7E!important;
      padding: 0;
    }
    .head-menuhome{
      flex-wrap: inherit!important;
      width: 100%;
    }
    .text-head{
      color: white;
      font-size: 17px!important;
    }
    .logo-cgd{
      max-width: 48px;
      height: 48px;
    }
    .logo-cgd img{
      width: 100%;
    }
  
    .navbar{

      background-color: #223E7E!important;
      border-bottom: 6px solid #f4742b!important;
      color: white!important;
    }
    .navbar-icon{
      color: white!important;
    }
  
    .style-navbar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
    .main{
      background-color: #eef0f8;

    }
    .router-link-exact-active.activemenu{
      background-color: #f4742b;
    
    }
    .activemenu:hover,
    .router-link-exact-active:hover{
      background-color: #f4742b;
    }
    .activemenu .menu-icon,
    .activemenu .menu-text{
      color: white!important;
    }
    .menu-link:hover{
      background-color: #f4742b;
    }
    .menu-link{
        text-decoration: none;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }
    .menu-icon {
      width: 20px;
      margin-right: 1rem;
      font-size: 24px;
      color: white;
    }
    .menu-text {
      color: white;
      font-size: 16px!important;
      text-align: left;
      line-height: inherit!important;
      font-weight: 300!important;
    }
    .style-label{
      text-align: left;
      margin-bottom: 2px!important;
      font-size: 12px;
    }
    .style-label span{
      color: red;
      font-size: 16px;
    }
    .h2{
         text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
    .error_message{
      text-align: left;
      font-size: 12px;
      color: #ff5252;
      margin-top: 4px;
    }
  
    .btn-cancel{
      border: 1px solid #223E7E;
      color: #223E7E;
    }
    .btn-save{
        border: 1px solid #223E7E;
        background: #223E7E!important;
        color: white!important;

    }
    .btn-action{
      color: #223E7E!important;

    }
    .ficon-24 {
      font-size: 24px;
      cursor: pointer;
      color: white;
    }
    .f-16{
      font-size: 14px;
    }

    .style-card{
      box-shadow: none!important;
    }
    .top-head{
      text-align: left;
      margin-bottom: 1rem;
    }
    .head-font{
      color: #223E7E;
      font-size: 30px;
    }
    .btn-head{
      padding: 1.25rem!important;
    }
    .btn-head span{
      color: #223E7E;
      font-size: 14px;
    }
    .btn-logout{
      background: #f4742b;

    }

    .color-white{
      color: white;
    }

    .btn-logout span{

      color: white;
    }
    /* .v-list-item--active{
      background-color: #f4742b;
      color: white!important;
    } */
       /* custom sweetAlert */
    div:where(.swal2-container) div:where(.swal2-popup) {
      font-family:'chulabhornlikittext', sans-serif !important;
      font-display: block;
    }
    table{
     /* display: block; */
     overflow-x: auto;
     white-space: nowrap;
   }
    .style-table td{
        border: 1px solid #D9D9D9;
    }
   ::-webkit-scrollbar {
      width: 4px;
      height: 6px;
      border: 1px solid #D9D9D9;
    }
  
    ::-webkit-scrollbar-track {
      border-radius: 0;
      background: #eeeeee;
    }
  
    ::-webkit-scrollbar-thumb {
      border-radius: 0;
      background: #D9D9D9;
    }
    .head-toolbar{
      box-shadow: none;
      background: #f4742b!important;
      color: white;
    }
   
    .head-toolbar .toolbar-icon{
      font-size: 24px;
      color: white;
    }
   
  

 
  </style>