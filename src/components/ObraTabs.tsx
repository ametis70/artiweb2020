import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Icon,
} from '@chakra-ui/react'
import { GrCirclePlay, GrDocumentPdf, GrBrush } from 'react-icons/gr'
import ReactPlayer from 'react-player'

import type { ObraComponentProps } from './Obra'
import Obra from './Obra'

const tabProps = {
  _selected: { color: 'white', bg: 'magenta', '& svg path': { stroke: 'white' } },
  borderColor: 'magenta',
  color: 'gray.500',
  sx: { '& svg': { mr: '0.5rem' }, '& svg path': { stroke: 'gray.500' } },
}

const tabNames: string[] = ['obra', 'investigación', 'video']

const ObraTabs: React.FC<ObraComponentProps> = ({ student, secondStudent, maxW }) => {
  const router = useRouter()

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const index = tabNames.indexOf(router.query.ver as string)
    setTabIndex(index !== -1 ? index : 0)
  }, [router.query.ver])

  const handleTabsChange = (index) => {
    router.push(`/obras?obra=${router.query.obra}&ver=${tabNames[index]}`, undefined, {
      shallow: true,
    })
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
          <Icon as={GrDocumentPdf} />
          Investigación
        </Tab>
        <Tab {...tabProps}>
          <Icon as={GrCirclePlay} />
          Video-defensa
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Obra maxW={maxW} student={student} secondStudent={secondStudent} />
        </TabPanel>
        <TabPanel>
          <Box
            maxW={maxW}
            m="0 auto"
            position="relative"
            display="block"
            h={`calc(${maxW} * 1.41)`}
            overflow="hidden"
          >
            <object
              type="application/pdf"
              data="https://trackr-media.tangiblemedia.org/publishedmedia/Papers/331-Tangible%20Bits%20Towards%20Seamless/Published/PDF"
              width="100%"
              height="100%"
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box maxW={maxW} m="0 auto">
            <Flex mt="3rem" align="center" justify="center">
              <ReactPlayer pip url="https://www.youtube.com/watch?v=0tdyU_gW6WE" />
            </Flex>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ObraTabs
