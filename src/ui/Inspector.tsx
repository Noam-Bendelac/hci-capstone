import { Dispatch, SetStateAction } from 'react'
import styles from './Inspector.module.css'
import * as model from 'model/model'
import produce from 'immer'
import { useTBVector3 } from 'scene3d/useMathStructs'
import classNames from 'classnames'



export const Inspector = ({
  onToggleCones,
  onToggleSpatial,
  onToggleScene,
  onClickSave,
  selectedSound,
  onChange,
  className,
}: {
  onToggleCones?: Dispatch<void>,
  onToggleSpatial?: Dispatch<void>,
  onToggleScene?: Dispatch<void>,
  onClickSave: Dispatch<void>,
  selectedSound: model.SoundSource,
  onChange: Dispatch<model.SoundSource>,
  className?: string,
}) => {
  // switch between 3 vector references on each update for react-three to notice
  // the mutations
  const newPos = useTBVector3()
  
  return <aside className={classNames(className, styles.main)}>
    <div className={styles.spacer} />
    <h1>
      Global Options
    </h1>
    <div className={styles.buttonsWrapper}>
      <button onClick={() => onToggleCones?.()}>Toggle audio field cone visualization</button>
      <button onClick={() => onToggleSpatial?.()}>Toggle audio field spatial intensity visualization</button>
    </div>
    <div className={styles.buttonsWrapper}>
      <button onClick={() => onToggleScene?.()}>Toggle between scenes</button>
      <button onClick={() => onClickSave()}>Save current scene</button>
    </div>
    
    <div className={styles.spacer} />
    <h1>
      Sound Source Options
    </h1>
    <p className={styles.slider}>
      X:
      -5
      <input
        type='range'
        value={selectedSound.position.x}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.position = newPos
            .copy(draft.position)
            .setX(Number.parseFloat(evt.target.value))
        }))}
        min='-5'
        max='5'
        step='0.2'
      />
      5
    </p>
    <p className={styles.slider}>
      Y:
      -5
      <input
        type='range'
        value={selectedSound.position.y}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.position = newPos
            .copy(draft.position)
            .setY(Number.parseFloat(evt.target.value))
        }))}
        min='-5'
        max='5'
        step='0.2'
      />
      5
    </p>
    <p className={styles.slider}>
      Z:
      -5
      <input
        type='range'
        value={selectedSound.position.z}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.position = newPos
            .copy(draft.position)
            .setZ(Number.parseFloat(evt.target.value))
        }))}
        min='-5'
        max='5'
        step='0.2'
      />
      5
    </p>
    <div className={styles.spacer} />
    <p className={styles.slider}>
      Yaw:
      -180
      <input
        type='range'
        value={selectedSound.orientation.yaw}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.orientation.yaw = Number.parseFloat(evt.target.value)
        }))}
        min='-180'
        max='180'
        step='1'
      />
      180
    </p>
    <p className={styles.slider}>
      Pitch:
      -90
      <input
        type='range'
        value={selectedSound.orientation.pitch}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.orientation.pitch = Number.parseFloat(evt.target.value)
        }))}
        min='-90'
        max='90'
        step='1'
      />
      90
    </p>
    <div className={styles.spacer} />
    <p className={styles.slider}>
      Cone inner angle:
      0
      <input
        type='range'
        value={selectedSound.coneInnerAngle}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.coneInnerAngle = Number.parseFloat(evt.target.value)
        }))}
        min='0'
        max='180'
        step='1'
      />
      180
    </p>
    <p className={styles.slider}>
      Cone attenuation distance:
      0
      <input
        type='range'
        value={selectedSound.refDistance}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.refDistance = Number.parseFloat(evt.target.value)
        }))}
        min='0'
        max='5'
        step='0.2'
      />
      5
    </p>
    {/* <p className={styles.slider}>Inner Length:
      <input defaultValue={selectedSound.innerLength} type='range' placeholder='Roll' required/>
    </p>
    <p className={styles.slider}>Inner Width:
      <input defaultValue={selectedSound.innerWidth} type='range' placeholder='Roll' required/>
    </p>
    <p className={styles.slider}>Outer Length:
      <input defaultValue={selectedSound.outerLength} type='range' placeholder='Roll' required/>
    </p>
    <p className={styles.slider}>Outer Width:
      <input defaultValue={selectedSound.outerWidth} type='range' placeholder='Roll' required/>
    </p>
    <button onClick={() => setLoop(curr => !curr)}>
      Loop? (Temp)
    </button> */}
  </aside>
}