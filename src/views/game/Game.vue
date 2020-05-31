<template>
  <v-container fluid>
    <v-row dense>
      <v-col class="flex-grow-0">
        <v-card class="fill-height">
          <v-card-title>
            Black Card
          </v-card-title>
          <v-card-text>
            <Card v-if="blackCard" disable-select-style :text="blackCard.text"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="fill-height">
          <v-card-title>
            Played Cards
          </v-card-title>
          <v-card-text>
            <v-row no-gutters dense>
              <v-col v-for="(card, index) in playedCards" :key="card.key">
                <Card :is-selectable="card.isSelectable" :id="card.id" :text="card.text" :is-white-card="card.isWhiteCard" @changed="e => playedCards[index].isSelected = e" :selected="card.isSelected"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="flex-grow-0">
        <v-card class="fill-height">
          <v-container fluid class="align-baseline fill-height">
            <v-row align="baseline">
              <v-simple-table class="flex-grow-1">
                <thead>
                <tr>
                  <th class="text-left">Username</th>
                  <th class="text-left">Score</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in players" :key="item.uid">
                  <td>{{ item.username }}</td>
                  <td class="text-left">
                    {{ item.score }}
                  </td>
                  <td v-if="item.czar">
                    czar
                  </td>
                  <td v-else>

                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-btn>Settings</v-btn>
              </v-col>
              <v-col>
                <v-btn>Get Link</v-btn>
              </v-col>
              <v-col>
                <v-btn @click="submit">Submit</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Your Hand
          </v-card-title>
          <v-card-text>
            <v-row no-gutters dense>
              <v-col v-for="(card, index) in hand" :key="card.key">
                <Card :is-selectable="card.isSelectable" :id="card.id" :text="card.text" :is-white-card="card.isWhiteCard" @changed="e => hand[index].isSelected = e" :selected="card.isSelected"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>

    </v-row>
  </v-container>
</template>

<script>
    import Card from "../../components/Card";
    import Events from '../../Events'
    import firebase from 'firebase/app'
    import crypto from 'crypto'
    import 'firebase/auth'

    export default {
        name: "Game",
        components: { Card },
        props: ['gameID'],
        data: () => {
          return {
            user: null,
            hand: [],
            playedCards: [],
            blackCard: null,
          }
        },
        created() {
            const ref = this;
            firebase.auth().onAuthStateChanged(user => {
              if (user)
                ref.user = user;
              if (this.$store.getters.getGame)
                ref.blackCardUpdate();
              else {
                ref.$store.commit('assignRedirectURL', ref.$route.path);
                ref.$router.push(`/login/`);
              }
            });
        },
        watch: {
          handFromStore: function () {
            this.hand.splice(0, this.hand.length);
            const cards = this.handFromStore;
            cards.forEach(card => this.hand.push(card));
          },
          playedCardsFromStore: function () {
            this.playedCards.splice(0, this.playedCards.length);
            const cards = this.playedCardsFromStore;
            cards.forEach(card => this.playedCards.push(card));
          },
          game: function () {
            this.blackCardUpdate();
          }
        },
        computed: {
            handFromStore() {
              console.log("running youHand");
              if (this.user) {
                const whiteCards = this.$store.getters.getWhiteCards;
                const czar_uid = this.$store.getters.getGame.currentRound.czar.uid;
                let isSelectable = !this.$store.getters.getGame.currentRound.picking;
                if (czar_uid === this.user.uid)
                  isSelectable = false;
                const cards = this.$store.getters.getGame.hands.find(element => element.uid === this.user.uid).cards.map(id => {
                  const card = whiteCards.find(card => id === card.id);
                  card.isWhiteCard = true;
                  card.isSelectable = isSelectable;
                  card.isSelected = false;
                  card.key = crypto.randomBytes(10).toString("hex");

                  return card;
                });
                console.log(cards);
                return cards;
              }
              return [];
            },
            game() {
              return this.$store.getters.getGame;
            },
            playedCardsFromStore() {
              const round = this.$store.getters.getGame.currentRound;
              const whiteCards = this.$store.getters.getWhiteCards;
              if (!this.user)
                return [];
              if (round && round.picking) {
                const isSelectable = round.czar.uid === this.user.uid;
                return round.playedCards.map(playedCard => {
                  const card = whiteCards.find(card => card.id === playedCard.card);
                  card.isWhiteCard = true;
                  card.isSelectable = isSelectable;
                  card.isSelected = false;
                  card.uid = playedCard.uid;
                  card.key = crypto.randomBytes(10).toString("hex");

                  return card;
                });
              } else {
                return round.playedCards.map(playedCard => {
                  return {
                   id: playedCard.card,
                   text: "",
                   isWhiteCard: true,
                   isSelectable: false,
                   isSelected: false,
                   uid: playedCard.uid,
                   key: crypto.randomBytes(10).toString("hex"),
                 }
                });
              }
            },
            players() {
                return this.$store.getters.getGame.players.filter(player => player.isActive).map(player => {
                    if (player.uid === this.$store.getters.getGame.currentRound.czar.uid)
                        player.czar = true;
                    return player;
                });
            },
        },
        methods: {
            submit() {
                if (this.$store.getters.getGame.currentRound.picking) {
                    const pickCount = this.blackCard.pick;
                    const selectedPlayedCards = this.playedCards.filter(card => card.isSelected);
                    if (selectedPlayedCards.length !== pickCount) {
                      console.log(this.blackCard);
                        alert(`You may only select ${pickCount} ${pickCount === 1 ? "card." : "cards."}`);
                        console.log(selectedPlayedCards);
                    } else {
                        this.$store.getters.getServer.emit(Events.client.PICK_WINNER, selectedPlayedCards.map(card => {
                            return { id: card.id, uid: card.uid }
                        }));
                    }
                } else {
                  const pickCount = this.blackCard.pick;
                  const handSelectedCards = this.hand.filter(card => card.isSelected);
                  if (handSelectedCards.length !== pickCount) {
                    console.log(this.blackCard);
                    alert(`You may only select ${pickCount} ${pickCount === 1 ? "card." : "cards."}`);
                  } else {
                    this.$store.getters.getServer.emit(Events.client.SUBMIT_CARD, handSelectedCards.map(card => card.id));
                  }
                }
            },
          blackCardUpdate() {
            this.blackCard = this.$store.getters.getBlackCards.find(card => card.id === this.game.currentRound.blackCard);
          }
        }
    }
</script>

<style scoped>

</style>