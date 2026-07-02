# Server Monitor - Automatizovano Okruženje

Ovaj projekat predstavlja potpuno automatizovano rešenje za podizanje i upravljanje aplikacijom "Server Monitor". Sistem se sastoji od Node.js backend API-ja, PostgreSQL baze podataka i Nginx frontend servera, a celokupna infrastruktura se podiže u Docker kontejnerima pomoću Ansible-a.

---

## Tehnologije
* **Automatizacija:** Ansible (Uloge, Plejbuci)
* **Kontejnerizacija:** Docker, Docker Compose
* **Backend:** Node.js (Express)
* **Frontend:** Nginx, HTML, CSS, JavaScript
* **Baza podataka:** PostgreSQL

---

## Struktura Projekta
* `roles/` - Ansible uloge za instalaciju Docker-a i konfiguraciju aplikacije
* `group_vars/all.yml` - Centralno mesto za konfiguraciju varijabli (putanje, portovi, kredencijali)
* `docker-compose.yml` - Definicija i povezivanje frontend, backend i db kontejnera
* `pokreni.sh` - Skripta za automatsko pokretanje celog sistema
* `zaustavi.sh` - Skripta za bezbedno gašenje i čišćenje okruženja

---

## Pokretanje i Korišćenje

Sve je maksimalno automatizovano kroz bash skripte. Nije potrebno ručno podešavati Docker ili kucati duge Ansible komande.

### 1. Kloniranje i pozicioniranje
Klonirajte repozitorijum direktno u vaš početni direktorijum (`/home/student/`):
```bash
cd /home/student/
git clone [https://github.com/jovanadjokic/samousluznainfra.git](https://github.com/jovanadjokic/samousluznainfra.git)
cd samousluznainfra
