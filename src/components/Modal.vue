<template>
    <div>
        <ion-header style="position: relative">
            <p style="color: red; position: absolute; right: 15px; font-weight: bold; top: 50%; z-index: 1000; transform: translateY(-50%); margin: 0" @click="closeModal">Close</p>
            <ion-toolbar>
                <ion-title style="position: relative">{{content}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="containerInput">
                <label>Titre :</label>
                <input :value="book.title" @input="setTitle($event.target.value)" :class="{ 'form-group--error': $v.book.title.$error }" type="text" name="title"></input>
            </div>
            <div class="containerInput">
                <label>Description :</label>
                <textarea :value="book.shortDescription" @input="setDescription($event.target.value)" :class="{ 'form-group--error': $v.book.shortDescription.$error }" name="description"></textarea>
            </div>
            <div class="containerInput">
                <label>URL de l'image :</label>
                <input :value="book.thumbnailUrl" @input="setImage($event.target.value)" :class="{ 'form-group--error': $v.book.thumbnailUrl.$error }" name="urlImage"></input>
            </div>
            <div class="containerInput">
                <label>Nombre de page :</label>
                <input :value="book.pageCount" @input="setPages($event.target.value)" :class="{ 'form-group--error': $v.book.pageCount.$error }" name="nbPage"></input>
            </div>
            <ion-button v-if="!editing" @click="submit" expand="block">Add</ion-button>
            <ion-button v-if="editing" @click="update" expand="block">Update</ion-button>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        </ion-content>
    </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'

    export default {
        name: 'Modal',
        data() {
            return {
                book: {
                    title: '',
                    shortDescription: '',
                    thumbnailUrl: '',
                    pageCount: ''
                },
                editing: false,
                submitStatus: ''
            }
        },
        validations: {
            book: {
                title: {
                    required,
                    minLength: minLength(4)
                },
                shortDescription: {
                    required,
                    minLength: minLength(5)
                },
                thumbnailUrl: {
                    required
                },
                pageCount: {
                    required
                }
            }
        },
        methods: {
            closeModal() {
                return this.$ionic.modalController.dismiss()
            },
            setTitle(value) {
                this.book.title = value
                this.$v.book.title.$touch()
            },
            setDescription(value) {
                this.book.shortDescription = value
                this.$v.book.shortDescription.$touch()
            },
            setImage(value) {
                this.book.thumbnailUrl = value
                this.$v.book.thumbnailUrl.$touch()
            },
            setPages(value) {
                this.book.pageCount = value
                this.$v.book.pageCount.$touch()
            },
            submit() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    this.$bus.$emit('add', this.book)
                    this.closeModal()
                }
            },
            update() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    this.$bus.$emit('update', this.book)
                    this.closeModal()
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    * {
        outline: none;
    }
    .containerInput {
        display: flex;
        flex-direction: column;
        text-align: start;
        margin: 10px 0;

        input, textarea {
            border: 0.5px solid lightgrey;
            border-radius: 5px;
            padding: 10px 15px;
            margin-top: 5px;
        }
        input:focus, textarea:focus {
            border: 0.5px solid cornflowerblue;
        }
    }
    .form-group--error {
        border: 1px solid red;
    }
</style>
