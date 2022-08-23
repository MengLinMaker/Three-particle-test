import './App.scss'

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { OrbitControls, Stats } from '@react-three/drei'
import { BufferAttribute, Vector3 } from 'three'




function App() {
  
  return (
    <section className="canvas">
      <Canvas>
        <Stats/>
        <AnimatedPoints count={100}/>
        <BufferPoints count={10e4}/>
        <OrbitControls />
      </Canvas>
    </section>
  )
}

export default App










function BufferPoints({ count=10e4 }:any) {
  let points = useMemo(() => {
    const p = new Array(count*3).fill(0).map((v) => (0.5 - Math.random()) * 1)
    return new BufferAttribute(new Float32Array(p), 3)
  }, [count])
  let vel = new Array(count*3).fill(0)

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color={0xffffff}
        sizeAttenuation={true}
      />
    </points>
  );
}




function AnimatedPoints({ count = 1000 }:any) {

  return (
    <group>
      {[...Array(count).keys()].map((i) => 
      <Point/>
      )}
    </group>
  )
}

function Point({ position =  new THREE.Vector3((0.5 - Math.random())*3,(0.5 - Math.random())*3,(0.5 - Math.random())*3) }){
  const pointRef:any =  useRef(null)
  const alpha = (0.1 + Math.random())*0.1
  const delta = 1/60

  let velocity = { 
    x: (0.5 - Math.random())*0.02,
    y: (0.5 - Math.random())*0.02, 
    z: (0.5 - Math.random())*0.02 
  }

  useFrame((state) => {
    console.log(velocity.x)
    velocity.x = velocity.x - pointRef.current.position.x*alpha*delta
    pointRef.current.position.x = pointRef.current.position.x + velocity.x
    velocity.y = velocity.y - pointRef.current.position.y*alpha*delta
    pointRef.current.position.y = pointRef.current.position.y + velocity.y
    velocity.z = velocity.z - pointRef.current.position.z*alpha*delta
    pointRef.current.position.z = pointRef.current.position.z + velocity.z
  })

  return(
    <points ref={pointRef} position={position}>
      <bufferGeometry>
      <bufferAttribute attach={"attributes-position"} {... new BufferAttribute(new Float32Array([0,0,0]), 3)}/>
      </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={0xffffff}
          sizeAttenuation={true}
        />
    </points>
  )
}