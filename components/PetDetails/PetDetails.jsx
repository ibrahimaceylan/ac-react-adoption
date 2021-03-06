import React from 'react';
import PropTypes from 'prop-types';
import { has } from 'lodash/fp';
import Link from 'next/link';
import ShelterMap from '@components/ShelterMap';
import PetMediaSlider from '@components/PetMediaSlider';
import PetBio from '@components/PetBio';
import PetOptions from '@components/PetOptions';
import ShelterInfoBar from '@components/ShelterInfoBar';
import { petDetailsQuery } from '@queries';
import { NoRecordAvailable, NoRecordText, ContentSidebar, SidebarSection } from '@styles';
import {
  PetDetailsWrapper,
  ContentWrapper,
  MainContent,
  ContentSection,
  Title,
  Details,
} from './PetDetails.styles';

import NoRecordImage from '@static/images/icons/004-pawprint.svg';

const PetDetails = ({ getPetQuery, getShelterQuery, ...rest }) => {
  // console.log('rest', rest);
  if (getPetQuery.loading) {
    return <div>Loading</div>;
  }

  const isPetAvailable = has('pet', getPetQuery) && getPetQuery.pet;

  if (!isPetAvailable) {
    return (
      <NoRecordAvailable>
        <NoRecordText>
          <NoRecordImage />
          <p>No pet details available!</p>
          <Link>
            <a href="/" title="Homepage">
              Home
            </a>
          </Link>
        </NoRecordText>
      </NoRecordAvailable>
    );
  }

  const { pet } = getPetQuery;
  const { shelter } = getShelterQuery;

  return (
    <PetDetailsWrapper width="1200px">
      <ContentWrapper>
        <MainContent xs={12} sm={8} md={8}>
          <ContentSection>
            <ShelterMap shelter={shelter} />
            <Title>{pet.name}</Title>
            <Details>
              <p>{pet.description}</p>
            </Details>
            <PetOptions pet={pet} />
          </ContentSection>
        </MainContent>
        <ContentSidebar xs={12} sm={4} md={4}>
          <SidebarSection>
            <PetMediaSlider media={pet.media} />
            <PetBio
              pet={pet}
              filter={['name', 'status', 'sex', 'age', 'size']}
            />
          </SidebarSection>
          <SidebarSection withIcon>
            <ShelterInfoBar shelter={shelter} withIcon withTitle withButton />
          </SidebarSection>
        </ContentSidebar>
      </ContentWrapper>
    </PetDetailsWrapper>
  );
};

PetDetails.propTypes = {
  // bla: PropTypes.string,
};

PetDetails.defaultProps = {
  // bla: 'test',
};

export default petDetailsQuery(PetDetails);
