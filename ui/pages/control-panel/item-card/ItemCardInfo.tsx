import { Shades } from '@/ui/theme/shades'
import { Text } from '@chakra-ui/react'

type IdInfo = {
  id: string
  serialNumber?: number
}

export type MainInfo = Array<{ label: string; content: string[][] }>

export type ItemMainInfoProps = {
  idInfo: IdInfo
  mainInfo: MainInfo
}

const ItemCardInfo = ({ idInfo, mainInfo }: ItemMainInfoProps) => {
  return (
    <div {...containerStyle}>
      <div {...rowStyle}>
        <Text {...labelStyle}>ID:</Text>
        <Text {...textStyle}>{idInfo.id}</Text>
      </div>

      {idInfo.serialNumber ? (
        <div {...rowStyle}>
          <Text {...labelStyle}>Serial number:</Text>
          <Text {...textStyle}>{idInfo.serialNumber}</Text>
        </div>
      ) : null}

      {mainInfo.map((infoItem, index) => {
        return (
          <div key={`${idInfo.id}-label-${index}`} {...infoStyle}>
            <Text {...labelStyle}>{`${infoItem.label}:`}</Text>
            {(infoItem.content ?? []).map((item) => {
              if (Array.isArray(item)) {
                const optionalInfoFormatted = item.join(' | ')

                return (
                  <div key={`${idInfo.id}-${optionalInfoFormatted}`} {...infoItemStyle}>
                    <Text {...textStyle}>{optionalInfoFormatted}</Text>
                  </div>
                )
              } else {
                return <Text {...textStyle}>{item}</Text>
              }
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ItemCardInfo

const containerStyle = {
  style: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
    marginRight: '10px',
    marginLeft: '10px'
  } as React.CSSProperties
}

const rowStyle = {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexDirection: 'row'
  } as React.CSSProperties
}

const labelStyle = {
  color: Shades.MEDIUM,
  fontSize: '12px',
  fontWeight: 'bold',
  margin: 0,
  padding: 0
}

const textStyle = {
  color: Shades.VERY_DARK,
  fontSize: '14px',
  margin: 0,
  padding: 0
}
const infoStyle = {
  style: {
    marginTop: '5px'
  } as React.CSSProperties
}

const infoItemStyle = {
  style: {
    marginTop: '1px'
  } as React.CSSProperties
}
