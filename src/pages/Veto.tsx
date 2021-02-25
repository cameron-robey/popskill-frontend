// Modules
import React, { useState, useEffect } from 'react';

// Components
import PageTitle from '../components/helpers/PageInfo';

// Styles
import * as styles from './styles/VetoStyles';

interface MapsProps {
  maps: string[],
  callback: (
    map: string,
    selector: 'team1ban1' | 'team2ban1' | 'team1pick' | 'team2pick' | 'team1ban2' | 'team2ban2'
  ) => void,
  selector: 'team1ban1' | 'team2ban1' | 'team1pick' | 'team2pick' | 'team1ban2' | 'team2ban2'
}

const Maps: React.FC<MapsProps> = ({maps, callback, selector, ...props}) => {
  return <>
    <styles.MapsWrapper>
      {maps.map(i=><>
        <styles.Map mapImage={i.substring(0,4)} onClick={() => callback(i, selector)}>
          <img src={`/assets/pins/${i.substring(0,4)}.png`} />
          <p>{i}</p>
        </styles.Map>
      </>)}
    </styles.MapsWrapper>
  </>
}

interface SidesProps {
  callback: (
    side: 'ct'|'t',
    selector: 'team2pickside' | 'team1pickside'
  ) => void,
  selector: 'team2pickside' | 'team1pickside'
}

const Sides: React.FC<SidesProps> = ({callback, selector, ...props}) => {
  return <>
    <styles.SidesWrapper>
      <styles.Side sideImage="ct" onClick={()=>callback('ct',selector)}>
        <img src='/assets/sides/ct.webp' />
        <p>Counter-Terrorists</p>
      </styles.Side>
      <styles.Side sideImage="t" onClick={()=>callback('t',selector)}>
        <img src='/assets/sides/t.webp' />
        <p>Terrorists</p>
      </styles.Side>
    </styles.SidesWrapper>
  </>
}

interface FinalMapsProps {
  map1: {
    name: string,
    ct: string,
    t: string
  },
  map2: {
    name: string,
    ct: string,
    t: string
  },
  map3: {
    name: string
  }
}

const FinalMaps: React.FC<FinalMapsProps> = ({map1, map2, map3, ...props}) => {
  return <>
    <styles.FinalMapsWrapper>
      <styles.Map mapImage={map1.name.substring(0,4)}>
        <p>Map 1</p>
        <img src={`/assets/pins/${map1.name.substring(0,4)}.png`} />
        <p>{map1.name}</p>
        <p><b>CT: </b>{map1.ct}</p>
        <p><b>T: </b>{map1.t}</p>
      </styles.Map>
      <styles.Map mapImage={map2.name.substring(0,4)}>
        <p>Map 2</p>
        <img src={`/assets/pins/${map2.name.substring(0,4)}.png`} />
        <p>{map2.name}</p>
        <p><b>CT: </b>{map2.ct}</p>
        <p><b>T: </b>{map2.t}</p>
      </styles.Map>
      <styles.Map mapImage={map3.name.substring(0,4)}>
        <p>Decider</p>
        <img src={`/assets/pins/${map3.name.substring(0,4)}.png`} />
        <p>{map3.name}</p>
      </styles.Map>
    </styles.FinalMapsWrapper>
  </>
}

const Compare = () => {
  const mapOptions = ['cobblestone','inferno','nuke','overpass','shortdust','train','vertigo'];


  const [stage, setStage] = useState(0);

  // Team information
  const [teamNames, setTeamNames] = useState({team1: '', team2: ''});

  const [availableMaps, setAvailableMaps] = useState(mapOptions);

  const [pickbanData, setPickbanData] = useState({
    team1ban1: '',
    team2ban1: '',
    team1pick: '',
    team2pickside: '',
    team2pick: '',
    team1pickside: '',
    team1ban2: '',
    team2ban2: '',
    decider: ''
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, team: number) => {
    const newobj = {...teamNames};
    
    if (team === 1) newobj.team1 = e.target.value;
    else if (team === 2) newobj.team2 = e.target.value;

    setTeamNames(newobj);
  }

  const handleMapSelection = (
    map: string,
    selector: 'team1ban1' | 'team2ban1' | 'team1pick' | 'team2pick' | 'team1ban2' | 'team2ban2'
  ) => {
    const newobj = {...pickbanData};
    newobj[selector] = map;
    setPickbanData(newobj);

    const newarr = [...availableMaps];
    setAvailableMaps(newarr.filter(i=>i !== map));

    setStage(stage + 1);
  }

  const handleSidePick = (
    side: 'ct'|'t',
    selector: 'team1pickside' | 'team2pickside'
  ) => {
    const newobj = {...pickbanData};
    newobj[selector] = side;
    setPickbanData(newobj);

    setStage(stage + 1);
  }


  return <>
    <PageTitle title={'Wingman Tournament Veto - CUDGS CS:GO'} titleHideSiteName={true} />

    <styles.PageWrapper>
      {
        (() => {
          switch (stage) {
            case 0:
              // Input team names
              return <>
                <styles.WelcomeWrapper>
                  <styles.SectionTitle><b>CUDGS CS:GO Wingman Tournament Veto</b></styles.SectionTitle>
                  <styles.WelcomeSubtitle>Please use this tool to go through the vetos for your matches. One player should stream this and input all the choices from the teams.</styles.WelcomeSubtitle>
                  <styles.InputTitles>Please enter the team names:</styles.InputTitles>
                  <styles.NameInputWrapper>Team 1<styles.NameInput value={teamNames.team1} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleNameChange(e,1)} /></styles.NameInputWrapper>
                  <styles.NameInputWrapper>Team 2<styles.NameInput value={teamNames.team2} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleNameChange(e,2)}  /></styles.NameInputWrapper>
                  <styles.SubmitButton onClick={() => {if (teamNames.team1.length > 0 && teamNames.team2.length > 0) setStage(1)}}>Start Veto</styles.SubmitButton>
                </styles.WelcomeWrapper>
              </>
            
            case 1:
              // Team 1 ban
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team1}</b> Veto</styles.SectionTitle>
                <Maps maps={availableMaps} callback={handleMapSelection} selector='team1ban1' />
              </>
            
            case 2:
              // Team 2 ban
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team2}</b> Veto</styles.SectionTitle>
                <Maps maps={availableMaps} callback={handleMapSelection} selector='team2ban1' />
              </>
            
            case 3:
              // Team 1 pick
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team1}</b> Pick</styles.SectionTitle>
                <Maps maps={availableMaps} callback={handleMapSelection} selector='team1pick' />
              </>
            
            case 4:
              // Team 2 pick sides
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team2}</b> Pick Side</styles.SectionTitle>
                <Sides callback={handleSidePick} selector='team2pickside' />
              </>
            
            case 5:
              // Team 2 pick
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team2}</b> Pick</styles.SectionTitle>
                <Maps maps={availableMaps} callback={handleMapSelection} selector='team2pick' />
              </>
            
            case 6:
              // Team 1 pick sides
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team1}</b> Pick Sides</styles.SectionTitle>
                <Sides callback={handleSidePick} selector='team1pickside' />
              </>
            
            case 7:
              // Team 1 ban
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team1}</b> Ban</styles.SectionTitle>
                <Maps maps={availableMaps} callback={handleMapSelection} selector='team1ban2' />
              </>
            
            case 8:
              // Team 2 ban
              return <>
                <styles.SectionTitle>Team <b>{teamNames.team2}</b> Ban</styles.SectionTitle>
                <Maps maps={availableMaps} callback={handleMapSelection} selector='team2ban2' />
              </>
          
            
            case 9:
              // Show final maps
              console.log(pickbanData);
              return <>
                <styles.SectionTitle><b>Veto Result</b></styles.SectionTitle>
                <FinalMaps
                  map1={{
                    name: pickbanData.team1pick,
                    ct: pickbanData.team2pickside === "ct" ? teamNames.team2 : teamNames.team1,
                    t: pickbanData.team2pickside === "ct" ? teamNames.team1 : teamNames.team2,
                  }}
                  map2={{
                    name: pickbanData.team2pick,
                    ct: pickbanData.team1pickside === "ct" ? teamNames.team1 : teamNames.team2,
                    t: pickbanData.team1pickside === "ct" ? teamNames.team2 : teamNames.team1,
                  }}
                  map3={{
                    name: availableMaps[0]
                  }}
                />
              </>
          
            default:
              break;
          }
        
        
        })() 
      }

    </styles.PageWrapper>
  </>
}
export default Compare;
