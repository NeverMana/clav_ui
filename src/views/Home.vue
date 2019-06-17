<template>
  <v-container>

    <v-jumbotron height="200px">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">CLAV</h3>
            <span class="subheading">Plataforma para a Classificação e Avaliação da Informação Arquivística</span>
            <v-divider class="my-3"></v-divider>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="item in items"
        :key="item.name"
        expand-icon="mdi-menu-down"
      >
        <template v-slot:actions>
          <v-icon color="primary">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
          <div>{{ item.name }}</div>
        </template>
        <v-card>
          <v-card-text class="grey lighten-3">{{ item.description }}</v-card-text>
          <v-btn :href="item.path" flat color="blue">Consultar</v-btn>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { name: "Entidades", path: "/entidades", description: "Lista das entidades que estão envolvidas nos processos de negócio da Administração Pública e que foram identificadas até ao momento." },
          { name: "Tipologias de Entidades", path: "/tipologias", description: "Lista das tipologias de entidades que estão envolvidas nos processos de negócio da Administração Pública e que foram identificadas até ao momento." },
          { name: "Legislação", path: "/legislacao", description: "Lista da legislação que enquadra os processos de negócio da Administração Pública e que foi identificada até ao momento." },
          { name: "Lista Consolidada", path: "/classes", description: "Estrutura de classes da “Lista Consolidada para a classificação e avaliação da informação pública” que atualmente se encontra disponível. Inclui os níveis referentes aos processos de negócio da Administração Pública." }
        ]
      }
    }
  }
</script>
