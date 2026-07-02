#!/bin/bash

echo "=== Pokrećem čišćenje i gašenje okruženja ==="
ansible-playbook -i inventory.ini destroy.yml -K