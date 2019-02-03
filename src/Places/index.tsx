import React from 'react';
import VisibleCards from '../VisibleCards';
import LoadingCards from '../LoadingCards';

type Args = {
  hasCardsVisible: boolean,
  placesInfo: Groups,
  hasLoadingState: boolean,
  handleCheckTag(name : string): (checked : boolean) => Promise < void >,
  isChecked(name : string): boolean
}
const Places = ({hasCardsVisible, placesInfo, hasLoadingState, handleCheckTag, isChecked} : Args) => (
  <div>
    <div className="places">
      {hasCardsVisible && (<VisibleCards
        items={placesInfo[0].items}
        handleCheckTag={handleCheckTag}
        isChecked={isChecked}/>)}
      {hasLoadingState && [...(new Array(4))].map((_, index) => <LoadingCards key={index} index={index} />)}
    </div>
  </div>
)

export default Places;