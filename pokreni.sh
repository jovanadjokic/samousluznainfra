#!/bin/bash

echo "=== Korak 1: Instalacija bazičnih sistemskih zavisnosti ==="
sudo apt update && sudo apt install -y python3-pip

echo "=== Korak 2: Instalacija Ansible Docker kolekcije ==="
ansible-galaxy collection install community.docker

echo "=== Korak 3: Pokretanje Ansible Playbook-a ==="
ansible-playbook -i inventory.ini site.yml -K -b
