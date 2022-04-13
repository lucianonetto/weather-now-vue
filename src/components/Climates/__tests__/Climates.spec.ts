import { render, screen } from '@testing-library/vue';
import Climates from '@/components/Climates/index.vue'

describe('show logo', () => {
  test('should show section title when call component', () => {
    render(Climates);
    const logoElement = screen.getByAltText('Weather Now');
    expect(logoElement).toBeTruthy();
  });
})