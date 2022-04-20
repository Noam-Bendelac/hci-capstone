import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { speaker } from 'assets'
import { useLoader } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Color, Group, Mesh, MeshPhongMaterial } from 'three'


// due to the way the useLoader hook works, it seems this component suspends and
// must have a <Suspense> *outside* this component
export const PlaceholderSpeaker = () => {
  const obj = useLoader(OBJLoader, speaker)
  
  // test to color each part of the mesh a different material
  useEffect(() => {
    const group: Group = obj
    // these type assumptions (`as ...`) are only valid for the speaker.obj file
    const mesh = group.children[0] as Mesh
    const mats = mesh.material as MeshPhongMaterial[]
    // fill each material with a different color for testing
    const colors: [number, number, number][] = [[1,0,0], [1,1,0], [0,1,0], [0,1,1], [0,0,1], [1,0,1]]
    mats.forEach((mat, idx) => { mat.color.setRGB(...(colors[idx%colors.length]))})
  }, [obj])
  
  // test to put a new single material on the whole geometry
  const newMesh = useMemo(() => {
    
    const group: Group = obj
    const oldMesh = group.children[0] as Mesh
    const geometry = oldMesh.geometry
    const newMesh = new Mesh(geometry, new MeshPhongMaterial({
      color: new Color(0,0,1),
      // idk if i can get these to do anything:
      shininess: 5,
      // reflectivity: 0.8,
    }))
    return newMesh
  }, [obj])
  
  return <group
    scale={.003}
    // by default, the speaker.obj model faces +y; make it face +x:
    rotation={[0, 0, -Math.PI/2]}
  >
    <primitive
      object={obj}
      // object={newMesh}
    />
  </group>
}
