<template>
    <ion-app id="app">
        <ion-header>
            <ion-padding>
                <ion-toolbar>
                    <ion-title style="text-align: start; padding: 15px; font-weight: bold">BOOKZ<img style="width: 20px; height: 20px; position: absolute; right: 15px" @click="openModal" src="@/assets/plus.png" alt="add book"></ion-title>
                        </ion-title>
                </ion-toolbar>
            </ion-padding>
        </ion-header>
        <ion-content>
            <books></books>
        </ion-content>
    </ion-app>
</template>
<script>
    import Books from '@/components/Books'
    import Modal from '@/components/Modal'
    export default {
        components: {
            Books,
        },
        methods: {
            openModal() {
                return this.$ionic.modalController
                    .create({
                        component: Modal,
                        componentProps: {
                            data: {
                                content: 'New Content',
                            },
                            propsData: {
                                title: 'New title',
                            }
                        }
                    })
                    .then(m => m.present())
            }
        }
    }
</script>
<style lang="scss">
    #app {
        font-family: "Montserrat Alternates", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
    }
</style>
