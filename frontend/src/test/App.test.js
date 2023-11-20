import { render, screen, within } from '@testing-library/react';
import App from '../App';

describe('Testing to see if various components are being rendered', () => {

    //The DOM needs to render in order for the tests to run
    beforeEach(()=>{
        render(<App />);
    });

    it("should have settings that are available", ()=>{
        expect(screen.getAllByAltText('Settings')).toBeTruthy();
    });

    it("should have a feed switcher", ()=>{
        expect(screen.getByTitle("Feed Switcher"));
    });

    it("should have a sentiment analysis chart", ()=>{
        expect(screen.getByTitle("sentiment-analysis-chart"));
    });

    it("should have an about page", ()=>{
        expect(screen.getByTitle("About"));
    });
});


