import { render, screen } from '@testing-library/vue';
import Card from '@/components/Card/index.vue'

describe('show logo', () => {
  test('should show section title when call component', () => {
    render(Card);
    const logoElement = screen.getByAltText('Weather Now');
    expect(logoElement).toBeTruthy();
  });
})