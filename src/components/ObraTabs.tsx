import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GrBrush, GrCirclePlay, GrDocumentPdf } from 'react-icons/gr'
import { ObrasPageObra } from '../pages/obras/[slug]'

import Investigacion from './Investigacion'
import Obra from './Obra'
import ObraVideo from './ObraVideo'

const tabNames: string[] = ['obra', 'video', 'investigación']

const maxW = '840px'

const ObraTabs: React.FC<{ obra: ObrasPageObra }> = ({ obra }) => {
  if (typeof obra.alumnes[0] !== 'object') return

  const router = useRouter()

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const index = tabNames.indexOf(router.query.ver as string)
    setTabIndex(index !== -1 ? index : 0)
  }, [router.query.ver])

  const handleTabsChange = (index: number) => {
    router.push(`/obras/${obra.slug}?ver=${tabNames[index]}`, undefined, {
      shallow: true,
    })
  }

  const bg = obra.alumnes[0].carrera !== 'multimedia' ? 'green' : 'magenta'
  const fg = obra.alumnes[0].carrera !== 'multimedia' ? 'black' : 'white'

  const tabProps = {
    _selected: { color: fg, bg: bg, '& svg path': { stroke: fg } },
    borderColor: bg,
    color: 'gray.500',
    sx: { '& svg': { mr: '0.5rem' }, '& svg path': { stroke: 'gray.500' } },
  }

  return (
    <Tabs
      flex="1 0 0"
      isFitted
      isLazy
      pt="2rem"
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList
        maxW={maxW}
        m="0 auto"
        display="flex"
        flexDirection={['column-reverse', 'row', 'row']}
      >
        <Tab {...tabProps}>
          <Icon as={GrBrush} />
          Obra
        </Tab>
        <Tab {...tabProps}>
          <Icon as={GrCirclePlay} />
          Presentación
        </Tab>
        {obra.alumnes[0].carrera === 'multimedia' ? (
          <Tab {...tabProps}>
            <Icon as={GrDocumentPdf} />
            Investigación
          </Tab>
        ) : null}
      </TabList>

      <TabPanels>
        <TabPanel>
          <Obra maxW={maxW} obra={obra} />
        </TabPanel>
        <TabPanel>
          <ObraVideo maxW={maxW} obra={obra} />
        </TabPanel>
        {obra.alumnes[0].carrera === 'multimedia' ? (
          <TabPanel>
            <Investigacion maxW={maxW} obra={obra} />
          </TabPanel>
        ) : null}
      </TabPanels>
    </Tabs>
  )
}

export default ObraTabs
