$(document).ready(function() {
    var sudoku = function() {
        
        var fieldInfo = [];
        var interval;
        var test = new Test();

        test.fillSudoku();
        $('#solve-button').click(init);

        function init() {
            readInput();
            animationQueue = [];
            solve(fieldInfo[0][0], [0, 0]);
            interval = setInterval(updateSudoku, 0);
        }

        function updateSudoku() {
            if(!animationQueue.length) {
                clearInterval(interval);
            interval = setInterval(updateSudoku, 0);
            solve(fieldInfo[0][0], [0, 0]);
        }

        function updateSudoku() {
            if(!animationQueue.length)
                return;
            var next = animationQueue.shift();
            $('#field_' + next.index[0] + next.index[1]).val(next.value)
        }

        function solve(field, index) {
            var next;

            if(field.initial) {
                next = nextFieldInfo(field, index);
                if(!next) return false;
                if(!solve(next[0], next[1])) return false;
                return true;
            }
            var next = animationQueue.shift();
            $('#field_' + next.index[0] + next.index[1]).val(next.value)
        }

        function solve(field, index) {
            var next;

            if(field.initial) {
                next = nextFieldInfo(field, index);
                if(!next) return false;
                if(!solve(next[0], next[1])) return false;
                return true;
            }
            
            for(var i = 0; i < 10; i++) {
                if(canWriteToField(i, index)) {
                    fieldInfo[index[0]][index[1]].value = i;

                    animationQueue.push({
                        index: index,
                        value: i
                    });

                    next = nextFieldInfo(field, index);
                    if(!next) return false;
                    if(!solve(next[0], next[1])) return false;
                }
            }
            fieldInfo[index[0]][index[1]].value = '';

            /*
            animationQueue.push({
                index: index,
                value: ''
            });
            */
                    
            return true;
        }

        function nextFieldInfo(field, index) {
            var newIndex = [  ];

            if (index[1] === 8) {
                newIndex = [index[0] + 1, 0];
            } else {
                newIndex = [index[0], index[1] + 1];
            }

            if(newIndex[0] === 9)
                return null;

            var newField = fieldInfo[newIndex[0]][newIndex[1]];

            return [newField, newIndex]
        }

        function canWriteToField(value, index) {
            return !verticalCollision(value, index) &&
                   !horizontalCollision(value, index) &&
                   !squareCollision(value, index);
        }

        function horizontalCollision(value, index) {
            index = index[0];
            for(var i = 0; i < 9; i++) {
                if (value == fieldInfo[index][i].value)
                    return true;
            }
            return false;
        }

        function verticalCollision(value, index) {
            index = index[1];
            for(var i = 0; i < 9; i++) {
                if (value == fieldInfo[i][index].value)
                    return true;
            }
            return false;
        }

        function squareCollision(value, index) {
            var idRangeX = getIdRange(index[0]);
            var idRangeY = getIdRange(index[1]);

            for(var x of idRangeX)
                for(var y of idRangeY)
                    if(fieldInfo[x][y][0] == value)
                        return true;

            return false;
        }

        function getIdRange(id) {
            var id = parseInt(id);
            switch(id) {
                case 0:
                case 1:
                case 2:
                    return [0,1,2];
                case 3:
                case 4:
                case 5:
                    return [3,4,5];
                case 6:
                case 7:
                case 8:
                    return [6,7,8];
            }
        }

        function nextField(currField) {
            var currID = currField.attr('id').slice(-2);
            var next;
            if(currID[1] < 8) {
                next = $('#field_' + currID[0] + (parseInt(currID[1]) + 1).toString());
            } else {
                next = $('#field_' + (parseInt(currID[0]) + 1).toString() + '0');
            }
            if(!next.length) return false;
            else return next;
        }

        function readInput() {
            var next = $('#field_00');

            var index = -1;
            var initial;

            do {
                var initial = false

                if(next.attr('id').slice(-1) === '0') {
                    index += 1;
                    fieldInfo[index] = [];
                }
                
                if(next.val() !== '') {
                    initial = true
                    next.css('background-color', 'grey');
                }

                fieldInfo[index].push({ value: next.val(), initial: initial });

            } while(next = nextField(next))
        }
    }();
})
