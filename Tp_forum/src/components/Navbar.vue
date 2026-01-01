<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top">
    <!-- Gradient Background -->
    <div class="navbar-gradient"></div>
    
    <div class="container-fluid px-4">
      <!-- Brand avec animation -->
      <router-link to="/" class="navbar-brand d-flex align-items-center brand-hover">
        <span class="brand-text">Forum<span class="brand-accent">App</span></span>
      </router-link>
      <button 
        class="navbar-toggler border-0 shadow-none" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarContent"
        aria-controls="navbarContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Menu principal -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="user">
            <router-link to="/create-discussion" class="nav-link nav-link-custom">
              <i class="bi bi-plus-circle-fill me-1"></i>
              Créer Discussion
            </router-link>
          </li>
        </ul>

        <!-- Menu utilisateur -->
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <!-- Si pas connecté -->
          <template v-if="!user">
            <li class="nav-item me-2">
              <router-link to="/login" class="btn btn-outline-light btn-custom">
                <i class="bi bi-box-arrow-in-right me-1"></i>
                Connexion
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="btn btn-light btn-custom-primary">
                <i class="bi bi-person-plus-fill me-1"></i>
                Inscription
              </router-link>
            </li>
          </template>

          <!-- Si connecté -->
          <template v-if="user"> 
        <!-- Dropdown Profil -->
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle user-dropdown d-flex align-items-center" 
                href="#" 
                id="userDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <div class="user-avatar me-2">
                  <img 
                    :src="user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'User')" 
                    alt="Avatar"
                  >
                </div>
                <span class="user-name d-none d-lg-inline">{{ user.displayName || 'Utilisateur' }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-custom shadow-lg" aria-labelledby="userDropdown">
                <li class="dropdown-header">
                  <div class="d-flex align-items-center">
                    <div class="user-avatar-large me-2">
                      <img 
                        :src="user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'User')" 
                        alt="Avatar"
                      >
                    </div>
                    <div>
                      <div class="fw-bold">{{ user.displayName || 'Utilisateur' }}</div>
                      <div class="text-muted small">{{ user.email }}</div>
                    </div>
                  </div>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <router-link :to="`/profile/${user.uid}`" class="dropdown-item dropdown-item-custom">
                    <i class="bi bi-person-circle me-2"></i>
                    Mon Profil
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button @click="logoutUser" class="dropdown-item dropdown-item-custom text-danger">
                    <i class="bi bi-box-arrow-right me-2"></i>
                    Déconnexion
                  </button>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/authStore";

export default {
  name: "AppNavbar",
  setup() {
    const { user, logout } = useAuthStore();

    const logoutUser = async () => {
      await logout();
      window.location.href = "/";
    };

    return { user, logoutUser };
  }
};
</script>

<style scoped>
/* Navbar principale avec gradient */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1030;
  min-height: 70px;
}

.navbar-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.5;
  z-index: -1;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem 0;
  position: relative;
  z-index: 1;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.brand-hover:hover .brand-icon {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1) rotate(5deg);
}

.brand-text {
  color: white;
  letter-spacing: -0.5px;
}

.brand-accent {
  color: #ffd700;
  font-weight: 800;
}
.nav-link-custom {
  color: rgba(255, 255, 255, 0.9) !important;
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}
.nav-link-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-link-custom:hover::before {
  transform: translateX(0);
}

.nav-link-custom:hover {
  color: white !important;
  transform: translateY(-2px);
}

.nav-link-custom.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  color: white !important;
  backdrop-filter: blur(10px);
}

.btn-custom {
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
}

.btn-custom-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-custom-primary:hover {
  background: #ffd700;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.btn-notification {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-notification:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.btn-notification .badge {
  font-size: 0.65rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-dropdown {
  cursor: pointer;
  padding: 0.3rem 0.8rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  color: white !important;
}

.user-dropdown:hover {
  background: rgba(255, 255, 255, 0.2);
}

.user-dropdown:hover .user-avatar {
  transform: scale(1.1);
  border-color: white;
}

.user-name {
  font-weight: 600;
  margin-left: 0.5rem;
}
.dropdown-custom {
  background: white;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 0;
  min-width: 280px;
  margin-top: 0.5rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-header {
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px 15px 0 0;
  margin: -0.5rem -0rem 0.5rem;
}

.user-avatar-large {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.5);
  background: white;
}

.user-avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-item-custom {
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  margin: 0.2rem 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: 500;
}
.navbar-toggler {
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}
.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.3);
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
@media (max-width: 991.98px) {
  .nav-link-custom {
    margin: 0.2rem 0;
  }
  
  .btn-custom,
  .btn-custom-primary {
    width: 100%;
    margin: 0.3rem 0;
  }

  .btn-notification {
    width: 100%;
    height: 45px;
    border-radius: 10px;
    margin: 0.3rem 0;
  }

  .dropdown-custom {
    margin-top: 0.5rem;
    border-radius: 10px;
  }
}
.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
}
</style>