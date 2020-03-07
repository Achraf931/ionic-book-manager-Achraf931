<template>
    <div id="books">
        <div class="book" v-for="(book, index) in books">
            <img :src="book.thumbnailUrl" alt="">
            <div>
                <div id="containerInfos">
                    <p id="title">{{ book.title }}</p>
                    <p>{{ book.shortDescription.substring(0, 20) }}</p>
                    <b>{{ book.pageCount }}</b>
                </div>
                <div id="containerButtons">
                    <img src="@/assets/cross.png" @click="deleteBook(index)" alt="delete">
                    <img src="@/assets/pencil.png" @click="openModalUpdate(book)" align="update">
                </div>
            </div>
        </div>
        <div v-if="books.length == 0" class="book">Vous n'avez aucun livre</div>
    </div>
</template>
<script>
    import Books from '../../data/books.json'
    import Modal from './Modal'
    export default {
        name: 'Books',
        data() {
            return {
                books: []
            }
        },
        mounted() {
            this.$bus.$on('add', data => {
                this.books.push(data)
            })
            this.$bus.$on('update', data => {
                localStorage.setItem('books', JSON.stringify(this.books))
            })
            if (!localStorage.getItem('books')) {
                localStorage.setItem('books', JSON.stringify(Books))
            }
            if (JSON.parse(localStorage.getItem('books')).length === 0) {
                localStorage.setItem('books', JSON.stringify(Books))
            }

            this.books = JSON.parse(localStorage.getItem('books'))
        },
        methods: {
            deleteBook(index) {
                this.books.splice(index, 1)
                localStorage.setItem('books', JSON.stringify(this.books))
            },
            openModalUpdate(book) {
                return this.$ionic.modalController
                    .create({
                        component: Modal,
                        componentProps: {
                            data: {
                                content: 'Update Book',
                                book: book,
                                editing: true
                            }
                        }
                    })
                    .then(m => m.present())
            }
        }
    }
</script>
<style lang="scss" scoped>
    #books {
        padding: 15px;
    }
    .book {
        display: flex;
        width: 100%;
        height: 90px;
        position: relative;
        flex-direction: row;
        margin: 10px 0;
        box-shadow: 2px 2px 2px lightgrey;
        border-radius: 15px;

        img {
            max-width: 100px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px 0 0 15px;
        }

        & > div {
            display: flex;
            flex-direction: row;
            width: calc(100% - 100px);

            div:first-child {
                align-items: flex-start;
                text-align: start;
                justify-content: space-between;
                width: 80%;

                * {
                    margin: 0;
                }

                b {
                    font-size: 12px;
                    color: darkorange;
                }

                #title {
                    font-weight: bold;

                }
            }

            div:last-child {
                width: 20%;

                img {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    right: 10px;
                    border-radius: 0;
                }

                img:first-child {
                    top: 10px;
                }

                img:last-child {
                    bottom: 10px;
                }
            }

            div {
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100%;
            }
        }
    }
</style>
