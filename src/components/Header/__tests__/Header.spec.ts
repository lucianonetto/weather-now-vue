import { render, screen } from '@testing-library/vue';
import Header from '@/components/Header/index.vue'

describe('show logo', () => {
  test('should show logo when render component', () => {
    render(Header);
    const logoElement = screen.getByAltText('Weather Now');
    expect(logoElement).toBeTruthy();
  });
})