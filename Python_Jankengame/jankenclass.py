import random

# プレイヤーの情報を辞書として定義する
class Player:
    def __init__(self, name, sword, shield, armor, person_info=None):
        self.name = name
        self.sword = sword
        self.shield = shield
        self.armor = armor
        self.person_info = person_info

    def __str__(self):
        info_str = f"{self.name}(Sword: {self.sword}, Shield: {self.shield}, Armor: {self.armor})"
        if self.person_info:
            info_str += f", Info: {self.person_info}"
        return info_str

    def lose_equipment(self):
        equipment = random.choice(["sword", "shield", "armor"])
        print(f"{self.name}が{equipment}を失いました！")
        setattr(self, equipment, 0)
        return equipment

# ジャンケンのロジックを持つクラス
class RockPaperScissors:
    choices = ["rock", "paper", "scissors"]

    @staticmethod
    def play():
        return random.choice(RockPaperScissors.choices)

# ジャンケンを行う関数
def janken_game(player, enemy):
    player_choice = RockPaperScissors.play()
    enemy_choice = RockPaperScissors.play()

    print(f"{player.name}の選択: {player_choice}")
    print(f"{enemy.name}の選択: {enemy_choice}")

    if player_choice == enemy_choice:
        print("引き分け!")
    elif (player_choice == "rock" and enemy_choice == "scissors") or \
         (player_choice == "paper" and enemy_choice == "rock") or \
         (player_choice == "scissors" and enemy_choice == "paper"):
        print(f"{player.name}が勝利しました！")
    else:
        print(f"{enemy.name}が勝利しました！")
        equipment = player.lose_equipment()
        print(player)  # プレイヤーの状態を表示

# メインの実行部分
if __name__ == "__main__":
    person_info = {
        "personname": "miyo",
        "gender": "unknown",
        "weight": 56,
        "height": 170
    }

    player = Player("You", sword=10000, shield=7000, armor=12000, person_info=person_info)
    enemy = Player("Opponent", sword=8000, shield=8000, armor=10000)

    janken_game(player, enemy)
