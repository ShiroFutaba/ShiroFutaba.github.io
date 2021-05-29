window.onload = function(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const material = new THREE.ShaderMaterial({

        // uniforms: {

        //     time: { value: 1.0 },
        //     resolution: { value: new THREE.Vector2() }

        // },

        //vertexShader: document.getElementById('vertexShader').textContent,
        //fragmentShader: document.getElementById('fragmentShader').textContent
        vertexShader:`
        void main() {
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vec4 mvPosition =  viewMatrix * worldPosition;
        gl_Position = projectionMatrix * mvPosition;
        }

        `,
        fragmentShader:`
        void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }

        `

    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
    animate();
};