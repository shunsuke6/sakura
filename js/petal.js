export default class Petal {
  constructor(petalTexture) {
    const petalGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const petalMaterial = new THREE.MeshBasicMaterial({
      map: petalTexture,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(petalGeometry, petalMaterial);
    this.fallSpeed = Math.random() * 0.03 + 0.02;
    this.windInfluence = Math.random() * 0.05 + 0.01;
    this.rotationSpeed = 0.06;

    this.mesh.position.set(
      Math.random() * 25 - 13,
      Math.random() * 20 - 13,
      Math.random() * 50 - 13
    );

    this.mesh.rotation.set(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI
    );
  }

  update(time) {
    this.mesh.rotation.x += this.rotationSpeed;
    this.mesh.rotation.y += this.rotationSpeed;
    this.mesh.rotation.z += this.rotationSpeed;
    this.mesh.position.y -= this.fallSpeed;

    const windStrength = 0.2;
    this.mesh.position.x +=
      windStrength * this.windInfluence * Math.sin(time + this.mesh.position.y);

    if (this.mesh.position.y < -10) {
      this.mesh.position.y = 10;
      this.mesh.position.x = Math.random() * 20 - 10;
      this.mesh.position.z = Math.random() * 20 - 10;
    }
  }
}
