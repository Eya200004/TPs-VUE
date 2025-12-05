<template>
  <div class="home-container">
    <div class="home-content">
      <img src="@/assets/ensaph.png" alt="ENSA Safi" class="ensa-image" />
      <div class="text-content">
        <h2>Bienvenue sur ENSA Voting</h2>
        <p>
          L'application officielle pour les étudiants de l'ENSA Safi. Connectez-vous ou inscrivez-vous pour voter sur les événements proposés par l'école.
          Restez informé des conférences, activités culturelles et événements sportifs.
        </p>
        <p>
          Avec ENSA Voting, participez facilement aux décisions et exprimez votre opinion sur les événements étudiants. Votre voix compte !
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView"
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  margin: 50px 20px;
}

.home-content {
  display: flex;
  align-items: center;
  max-width: 1000px;
  gap: 40px;
  flex-wrap: wrap;
}

.ensa-image {
  max-width: 400px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.text-content {
  flex: 1; 
}

.text-content h2 {
  color: #7B4B3A; 
  margin-bottom: 16px;
}

.text-content p {
  font-size: 1.1rem;
  color: #4B5563;
  margin-bottom: 12px;
  line-height: 1.5;
}
</style>
