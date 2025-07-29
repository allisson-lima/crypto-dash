import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Coin } from '@/types/coin';
import { useCryptoStore } from '@/store/crypto-store';
import { CoinsTable } from '@/components/coin/coins-table';

jest.mock('@/store/crypto-store', () => ({
  useCryptoStore: jest.fn(),
}));

jest.mock('@/components/sparkline', () => ({
  Sparkline: () => <div data-testid="sparkline" />,
}));

// Coin fake para usar nos testes
const mockCoin: Coin = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: '/bitcoin.png',
  current_price: 30000,
  price_change_percentage_24h: 2.5,
  market_cap_rank: 1,
  total_volume: 1000000000,
  market_cap: 600000000000,
  sparkline_in_7d: {
    price: [1, 2, 3, 4, 5, 6, 7],
  },
  fully_diluted_valuation: null,
  high_24h: 0,
  low_24h: 0,
  price_change_24h: 0,
  market_cap_change_24h: 0,
  market_cap_change_percentage_24h: 0,
  circulating_supply: 0,
  total_supply: null,
  max_supply: null,
  ath: 0,
  ath_change_percentage: 0,
  ath_date: '',
  atl: 0,
  atl_change_percentage: 0,
  atl_date: '',
  roi: null,
  last_updated: '',
};

describe('CoinsTable', () => {
  it('renderiza alerta de erro quando isError é true', () => {
    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      toggleFavorite: jest.fn(),
    });

    render(<CoinsTable coins={[]} isError error="Erro ao buscar dados" />);

    expect(screen.getByText('Erro ao buscar dados')).toBeInTheDocument();
  });

  it('renderiza mensagem quando lista de moedas está vazia', () => {
    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      toggleFavorite: jest.fn(),
    });

    render(<CoinsTable coins={[]} />);

    expect(screen.getByText('Nenhuma moeda encontrada.')).toBeInTheDocument();
  });

  it('chama toggleFavorite ao clicar na estrela', async () => {
    const toggleFavoriteMock = jest.fn();

    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      toggleFavorite: toggleFavoriteMock,
    });

    render(<CoinsTable coins={[mockCoin]} />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(toggleFavoriteMock).toHaveBeenCalledWith('bitcoin');
  });

  it('exibe estrela preenchida quando moeda está nos favoritos', () => {
    (useCryptoStore as unknown as jest.Mock).mockReturnValue({
      favorites: ['bitcoin'],
      toggleFavorite: jest.fn(),
    });

    render(<CoinsTable coins={[mockCoin]} />);

    const starIcon = screen.getByRole('button').querySelector('svg');
    expect(starIcon).toHaveClass('fill-yellow-400');
  });
});
