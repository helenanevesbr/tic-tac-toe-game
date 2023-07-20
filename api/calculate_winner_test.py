from calculate_winner import calculateWinner

def test_calculate_winner_no_winner():
    squares = [None] * 9
    result = calculateWinner(squares)["winner"]
    assert result == None

def test_calculate_winner_x_horizontally():
    squares = [
        "X", "X", "X",
        None, None, None,
        None, None, None
    ]
    result = calculateWinner(squares)["winner"]
    assert result == "X"

def test_calculate_winner_o_diagonally():
    squares = [
        "O", None, None,
        None, "O", None,
        None, None, "O"
    ]
    result = calculateWinner(squares)["winner"]
    assert result == "O"

def test_calculate_winner_x_vertically():
    squares = [
        "X", None, None,
        "X", None, None,
        "X", None, None
    ]
    result = calculateWinner(squares)["winner"]
    assert result == "X"

def test_calculate_winner_game_tie():
    squares = [
        "X", "O", "X",
        "O", "X", "O",
        "O", "X", "O"
    ]
    result = calculateWinner(squares)["winner"]
    assert result == None