import React, {useEffect, useState} from 'react';
import {Row, Col, Empty, Layout, notification, Icon} from 'antd';
import './App.css'
import Title from './Title/index';
import Filters from './Filters/index';
import Places from './Places/index';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

const {Content} = Layout;

const App = () => {
  const [groups,
    setGroups] : [Groups, any] = useState([]);
  const [latVal,
    setLat] = useState(0);
  const [lngVal,
    setLng] = useState(0);
  const [uxState,
    setUxState] = useState('loading');
  const [selectedTag,
    setTag] = useState('');
  const [offsetVal,
    setOffset] = useState(-10);
  const [radiusValue,
    setRadius] = useState(250);
  const [totalResults,
    setTotalResults] = useState(0);
  const [checkboxVal,
    setOpenNow] = useState(0);

  const fetchResponse = async({
    lat = latVal,
    lng = lngVal,
    offset = offsetVal + 10,
    radius = radiusValue,
    uxState = 'loading',
    openNow = checkboxVal,
    query = selectedTag
  } : {
    lat?: number,
    lng?: number,
    uxState?: string,
    offset?: number,
    radius?: number,
    openNow?: number,
    query?: string
  }) => {
    setUxState(uxState);
    setTimeout(scrollList, 1);
    setOffset(offset);
    const url = new URL('https://gagk1hz8h4.execute-api.eu-west-1.amazonaws.com/default/AdyenAssigment');
    const params = new URLSearchParams({
      ll: `${lat},${lng}`,
      offset: String(offset),
      radius: String(radius),
      openNow: String(openNow),
      limit: '10',
      query
    });
    try {
    const result = await fetch(`${url}?${params}`);
    const {response} = await result.json();
    setTimeout(() => setUxState('fulfilled'), 25);
    if (response && response.totalResults <= 5 && response.warning) {
      notification.open({message: 'Sorry!', description: response.warning.text, icon: <Icon type="meh"/>})
    }
    setTotalResults(response.totalResults);
    return response.groups;
    } catch {
      notification.error({message: 'Sorry!', description: 'We couldn\'t handle your request', icon: <Icon type="frown"/>})
    }
  }

  const setCurrentPosition = async({
    coords: {
      longitude,
      latitude
    }
  } : Position) => {
    if (latitude !== 0 && longitude !== 0 && latitude !== latVal && longitude !== lngVal) {
      setLat(latitude);
      setLng(longitude);
      const groupsResponse = await fetchResponse({lat: latitude, lng: longitude});
      setGroups(groupsResponse);
    }
  }

  useEffect(() => {
    const el : HTMLElement | null = document.getElementById('position');
    if (navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition(setCurrentPosition);
    } else {
      const el = document.getElementById('no-locale');
      if (el) {
        el.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  });

  const scrollList = () => {
    const places = document.getElementById('card-loading-0');
    if (places) {
      places.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
    };
  };

  const changeCardsAmount = async(e : React.MouseEvent < HTMLAnchorElement >) => {
    e.preventDefault();

    const [group] = await fetchResponse({
      uxState: 'loading-more',
      offset: offsetVal + 10
    });
    const {
      items,
      ...rest
    } = groups[0];
    const newItems = [
      ...items,
      ...(group.items)
    ];
    const newGroup = {
      ...rest,
      items: newItems
    };
    setGroups([newGroup])
  };

  const handleCheckTag = (name : string) => async(checked : boolean) => {
    const tagVal = checked
      ? name
      : '';
    setTag(tagVal)
    const groupsResponse = await fetchResponse({query: tagVal, offset: 0});
    setGroups(groupsResponse);
  };
  const isChecked = (name : string) => selectedTag.includes(name);

  const handleRadius = async(value : number | undefined) => {
    if (value) {
      setRadius(value);
    }
  };
  const handleRadiusBlur = async() => {
    const groupsResponse = await fetchResponse({offset: 0, radius: radiusValue});
    setGroups(groupsResponse);
  }
  const handleCheckbox = async(e : CheckboxChangeEvent) => {
    const open = e.target.checked
      ? 1
      : 0;
    setOpenNow(open);
    const groupsResponse = await fetchResponse({openNow: open});
    setGroups(groupsResponse);
  };

  const isEmpty = uxState === 'empty'
  const isFulfilled = uxState === 'fulfilled';
  const isLoading = uxState === 'loading';
  const isLoadingMore = uxState === 'loading-more';
  const isLoadingOrFulfilled = isLoadingMore || isFulfilled;

  const hasAnyLoading = isLoading || isLoadingMore;
  const hasNoItems = isEmpty || isFulfilled && (groups[0] && groups[0].items.length === 0);
  const hasItems = totalResults > 1;
  const hasCardsVisible = isLoadingOrFulfilled && hasItems;
  const hasMore = isFulfilled && groups[0] && groups[0].items.length < totalResults;

  const getText = () => {
    const hasFulfilledItems = (!isLoading && !isLoadingMore) && hasItems;
    const getTextLoaded = () => `Showing ${groups[0].items.length} of ${totalResults} places near you`

    const loadingText = 'Hang in there where, while we find cool places for you!';

    const textNoResults = 'There are no places near you that matches your preferences :(';
    const otherText = hasAnyLoading
      ? loadingText
      : textNoResults;

    return hasFulfilledItems
      ? getTextLoaded()
      : otherText;
  }

  return (
    <Layout className="main">
      <Content>
        <Row type="flex" justify="center">
          <Col
            xs={{
            span: 20,
            offset: 2
          }}
            lg={{
            span: 12,
            offset: 0
          }}>
            <div>
              <Title text={getText()}/>
              <Filters
                handleCheckbox={handleCheckbox}
                handleRadius={handleRadius}
                handleRadiusBlur={handleRadiusBlur}
                radiusValue={radiusValue}/> {hasNoItems && <Empty/>}
              <Places
                hasCardsVisible={hasCardsVisible}
                placesInfo={groups}
                hasLoadingState={hasAnyLoading}
                handleCheckTag={handleCheckTag}
                isChecked={isChecked}/> {hasMore && <a onClick={changeCardsAmount}>Show more</a>}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
export default App;
