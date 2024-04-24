<template>
    <v-app id="inspire">
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
                  รายการยา
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
          <v-btn depressed rounded text @click="logout" ><i class="fas fa-sign-out-alt"></i> ออกจากระบบ </v-btn>


          <!-- <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
  
              <div 
                class="box-user mr-2"
                v-bind="attrs"
                v-on="on"
              >
                <i class="fa-solid fa-circle-user f-24"></i>
              </div>
        
            </template>
  
            <v-list>

  
              <v-list-item >
                <v-list-item-title>
                  <v-btn depressed rounded text @click="logout"> <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i> ออกจากระบบ </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>

  
          </v-menu> -->
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
    export default {
      name: "MyHome",
      data: () => ({
          dialog: false,
          drawer: true,
      }),
      methods: {
     
        homeUser(){
          this.$router.push("/user/login");
        },
  
        async logout() {
            // await this.$store.dispatch("logout");
         
            await this.$router.push("/");

        }
      },
    
  }
  </script>
  <style>
    .container-page{
      padding: 1rem;
    }
    .v-application{
      font-family: 'Prompt', sans-serif!important;
    }
    .sidebar{
      background-image: url('@/assets/927756.jpg');
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

      background-color: #2e3192!important;
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
    .activemenu,
    .router-link-exact-active{
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
    .style-page{
      /* margin: 0 1rem; */
      /* width: 100%;
      max-width: 900px; */
      /* padding: 1.5rem;
      background-color: white;
      border-radius: 15px; */
      /* box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)!important; */
    } 
    .style-label{
      text-align: left;
      margin-bottom: 2px!important;
      font-size: 14px;
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
      border: 1px solid #003366;
      color: #003366;
    }
    .btn-submit{
        border: 1px solid #003366;
        background-color: #003366!important;
        color: white!important;
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
      color: #2e3192;
      font-size: 30px;
    }

  </style>