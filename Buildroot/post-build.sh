#!/bin/sh
set -ue

echo 'dtparam=i2c_arm=on' >> ${BINARIES_DIR}/rpi-firmware/config.txt

