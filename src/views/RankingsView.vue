<template>
    <div class="screen-bg">
        <div class="d-flex justify-start align-center text-center text-white flex-column pt-md-4 h-screen pt-8">
            <v-col cols="12" sm="9" md="8" lg="7"
                class="d-flex  justify-start pt-16 justify-sm-center pt-md-16 flex-column ">

                <h1>Player Rankings</h1>
                <v-table fixed-header height="500px">
                    <thead>
                        <tr>
                            <th class="text-center" v-for="header in headers" :key="header.title">
                                {{ header.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr v-for="player in players" :key="player.playerName">
                            <td>{{ player.name }}</td>
                            <td>{{ player.score }}</td>
                            <td>
                                <v-btn color="primary" dark @click="showEdit(player)">
                                    Edit
                                </v-btn>
                                <v-dialog v-model="editDialog" persistent max-width="700">
                                    <v-card color="cyan" variant="outlined">
                                        <v-card variant="outlined" class="pa-4 ma-2 bg-black" color="yellow">
                                            <v-card-title class="text-h5 text-center text-white">
                                                Edit Player Information
                                            </v-card-title>
                                            <v-card-text>
                                                <form ref="formX">
                                                    <v-text-field label="Player Name" solo dense class="text-white"
                                                        v-model="players.name" variant="filled">
                                                    </v-text-field>
                                                    <v-text-field label="Player Score" solo dense class="text-white"
                                                        v-model="players.score" variant="filled">
                                                    </v-text-field>
                                                </form>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="white" text @click="editDialog = false">
                                                    Cancel
                                                </v-btn>
                                                <v-btn color="yellow" text @click="editPlayer">
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-card>
                                </v-dialog>

                                <v-btn color="error" class="ml-2" dark @click="showDelete(player)">
                                    Delete
                                </v-btn>
                                <v-dialog v-model="deleteDialog" persistent max-width="700">

                                    <v-card color="cyan" variant="outlined">
                                        <v-card variant="outlined" class="pa-4 ma-2 bg-black" color="yellow">
                                            <v-card-title class="text-h5 text-center text-white">
                                                Delete Player Information
                                            </v-card-title>
                                            <v-card-text>
                                                <p>Are you sure you want to delete {{ players.name }}?</p>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="white" text @click="deleteDialog = false">
                                                    Cancel
                                                </v-btn>
                                                <v-btn color="yellow" text @click="deletePlayer">
                                                    Delete
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-card>
                                </v-dialog>
                            </td>

                        </tr>

                    </tbody>
                </v-table>
            </v-col>
        </div>
    </div>



</template>
<script>
    import {
        collection,
        onSnapshot,
        doc,
        updateDoc,
        deleteDoc
    } from "firebase/firestore";
    import db from '@/firebase';
    export default {
        data: () => ({

            currentPlayer: {
                name: '',
                score: '',
            },

            defaultPlayer: {
                name: '',
                score: '',
            },

            players: {
                name: '',
                score: '',
            },

            headers: [{
                    title: 'Name',
                },
                {
                    title: 'Score',
                },
                {
                    title: 'Actions',
                },

            ],

            editDialog: false,
            deleteDialog: false,
            docRef: null,
        }),
        watch: {
            editDialog(val) {
                val || this.closeEdit()
            },
            deleteDialog(val) {
                val || this.closeDelete()
            },
        },
        created() {
            // to fetch data
            this.initialize();
        },
        methods: {
            async initialize() {
                onSnapshot(collection(db, "players"), (snapshot) => {
                    let playerz = []
                    snapshot.forEach((doc) => {
                        playerz.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });
                    this.players = playerz;
                })
            },

            async showEdit(player) {
                this.players = Object.assign({}, player);
                const playerID = this.players.id;
                this.docRef = doc(collection(db, "players"), playerID);
                this.editDialog = true;
            },

            async editPlayer() {
                await updateDoc(this.docRef, {
                    name: this.players.name,
                    score: this.players.score,
                })
                this.closeEdit();
                console.log("Updated Successfully")
            },

            showDelete(player) {
                this.players = Object.assign({}, player);
                const playerID = this.players.id;
                this.docRef = doc(collection(db, "players"), playerID);
                this.deleteDialog = true;
            },

            async deletePlayer() {
                await deleteDoc(this.docRef);
                this.closeDelete();
                console.log("Deleted Successfully!")
            },

            closeEdit() {
               // this.resetForm();
                this.editDialog = false
                this.$nextTick(() => {
                    this.currentPlayer = Object.assign({}, this.defaultPlayer)
                })
            },

            closeDelete() {
                //this.resetForm();
                this.deleteDialog = false
                this.$nextTick(() => {
                    this.currentPlayer = Object.assign({}, this.defaultPlayer)
                })
            },

            resetForm() {
                this.$nextTick(() => {
                    this.$refs.formX.reset();
                })
                
            },


        }
    }
</script>
<style>
    .screen-bg {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), url("https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/33d245f3-98d0-4ea9-b129-98db9a053429_vangoghalive-article-banner%20image.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
    }
</style>